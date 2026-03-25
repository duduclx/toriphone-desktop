const useChatEvents = ({
  user,
  usersPresenceRef,
  setUsersPresence,
  chatRoomRef,
  chatMessagesRef,
  setChatMessages,
  setChatMessageUnread,
  setChatRoomsWithLastMessage,
  chatRoomsSortByDate,
  appCurrentPageRef,
  chatRoomsGetFull
}) => {

  // chatd_presence_updated
  const onChatPresenceUpdated = (data) => {
    // mise à jour usersPresence
    const updatedUsersPresence = { ...usersPresenceRef.current };

    // Faites une boucle sur les propriétés de updateUserInfos
    for (const id in updatedUsersPresence) {
      if (updatedUsersPresence.hasOwnProperty(id)) {
        if (id === data.data.uuid) {
          // Mettez à jour les propriétés de l'utilisateur correspondant
          updatedUsersPresence[id].connected = data.data.connected;
          updatedUsersPresence[id].doNotDisturb = data.data.do_not_disturb;
          updatedUsersPresence[id].lastActivity = data.data.last_activity;
          updatedUsersPresence[id].lineState = data.data.line_state;
          updatedUsersPresence[id].state = data.data.state;
          updatedUsersPresence[id].status = data.data.status;
        }
      }
    }
    // Utilisez setUserInfos pour mettre à jour l'état
    setUsersPresence(updatedUsersPresence);
  };

  // chatd_user_room_created
  const onChatUserRoomCreated = async (data) => {
    await chatRoomsGetFull();
    // mettre un badge de notif
    if (data.data.uuid !== chatRoomRef.current.uuid) {
      setChatMessageUnread((prevUnread) => {
        const currentUnread = { ...prevUnread };
        currentUnread[data.room_uuid] = (currentUnread[data.room_uuid] || 0) + 1;
        return currentUnread;
      });
    }
  };

  // chatd_user_room_message_created
  const onChatUserRoomMessageCreated = (data) => {
    // console.log("chatd_user_room_message_created", data)

    const userKey = `user_uuid:${user.uuid}`;

    if (userKey in data) {
        if (data.room_uuid === chatRoomRef.current.uuid && appCurrentPageRef.current === "chat") {
          // current room, we add message directly
          const currentMessages = [...chatMessagesRef.current];
          const dateObject = new Date(data.data.created_at);
          const newMessage = {
            uuid: data.data.uuid,
            date: dateObject,
            content: data.data.content,
            userUuid: data.data.user_uuid,
            alias: data.data.alias,
            roomUuid: data.data.room.uuid,
            read: true,
            type: "ChatMessage",
          };
    
          const updatedMessages = [...currentMessages, newMessage];
          setChatMessages(updatedMessages);
        } else {
          // not same room, put badge notification
          setChatMessageUnread((prevUnread) => {
            const currentUnread = { ...prevUnread };
            currentUnread[data.room_uuid] = (currentUnread[data.room_uuid] || 0) + 1;
            return currentUnread;
          });
        }
        // update last message on sidebar
        chatMessageLastUpdate(data);
    }
  };

  const chatMessageLastUpdate = async (data) => {
    const newLastMessage = {
      uuid: data.data.uuid,
      content: data.data.content,
      alias: data.data.alias,
      user_uuid: data.data.user_uuid,
      created_at: new Date(data.data.created_at),
    };
    setChatRoomsWithLastMessage((prevRooms) => {
      // Mettre à jour les rooms
      const updatedRooms = prevRooms.map((room) => {
        if (room.uuid === data.data.room.uuid) {
          return {
            ...room,
            last: newLastMessage,
          };
        } else {
          return room;
        }
      });
      const sortedRooms = chatRoomsSortByDate(updatedRooms);
      return sortedRooms;
    });
  };

  return {
    onChatPresenceUpdated,
    onChatUserRoomCreated,
    onChatUserRoomMessageCreated,
  };
};

export default useChatEvents;
