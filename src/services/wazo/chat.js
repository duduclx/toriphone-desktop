import { useState, useEffect, useRef } from "react";

const useChat = ({
  usersPresence,
  usersPresenceGet,
  processedUsersPresence,
  setProcessedUsersPresence,
  user,
  Wazo,
}) => {
  // values
  const [chatRooms, setChatRooms] = useState([]); // semble inutilisé au profit de roomsWithLastMessage
  const [chatRoom, setChatRoom] = useState({});
  const [chatRoomLastMessages, setChatRoomLastMessages] = useState({});
  const [chatRoomsWithLastMessage, setChatRoomsWithLastMessage] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatMessageUnread, setChatMessageUnread] = useState({});
  const chatRoomRef = useRef(chatRoom);
  const chatMessagesRef = useRef(chatMessages);

  // constantes
  const messagesOptions = {
    direction: "asc",
  };

  /**
   * Chat Rooms Get
   * @returns
   */
  const chatRoomsGet = async () => {
    const allRooms = await Wazo.chatd.getUserRooms();
    // mise à jour dans usersPresence
    const userPromises = allRooms.map(async (room) => {
      if (room.users.length === 2) {
        for (const user of room.users) {
          if (!processedUsersPresence.has(user.uuid)) {
            try {
              await usersPresenceGet(user.uuid);
              processedUsersPresence.add(user.uuid);
            } catch (e) {
              //console.log('deleted user', e)
            }
          }
        }
      }
    });
    await Promise.all(userPromises);
    setChatRooms(allRooms);
    return allRooms;
  };

  /**
   * Chat Room Create
   * @param {*} roomName
   * @param {*} roomUsersUuid
   * @returns
   */
  const chatRoomCreate = async (roomName = "", roomUsersUuid) => {
    const newRoom = await Wazo.chatd.createRoom(roomName, roomUsersUuid);
    setChatRoom(newRoom);
    return newRoom;
  };

  /**
   * chat Room Label Get
   * @param {*} room
   * @returns
   */
  const chatRoomLabelGet = (room) => {
    // obtenir le nom d'une discussion à deux en récupérant le nom de l'autre participant
    const currentUserUUID = user.uuid;
    // Filtrer les utilisateurs dans la salle pour obtenir celui qui n'est pas l'utilisateur actuel
    const otherUser = room.users.find((user) => user.uuid !== currentUserUUID);
    // Si l'utilisateur est trouvé, renvoyez ses informations
    if (otherUser) {
      return usersPresence[otherUser.uuid];
    }
    return null; // Si aucun utilisateur n'est trouvé
  };

  /**
   * Chat Room Messages Get
   * @param {*} room
   */
  const chatRoomMessagesGet = async (room) => {
    // on définit la room en cours de lecture
    setChatRoom(room);
    // chargement des messages de la discussion
    setChatMessages(await Wazo.chatd.getRoomMessages(room.uuid, messagesOptions));
    // remets les messages non lus de la conversation à zéro
    setChatMessageUnread((prevUnread) => {
      const currentUnread = { ...prevUnread };
      currentUnread[room.uuid] = 0; // Réinitialise à zéro
      return currentUnread; // Mettez à jour l'état avec le nouvel objet
    });
  };

  /**
   * Chat Room Message Last Get
   * @returns
   */
  const chatRoomMessageLastGet = async () => {
    const options = {
      direction: "asc",
      distinct: "room_uuid",
    };
    const lastMessages = await Wazo.chatd.getMessages(options);
    setChatRoomLastMessages(lastMessages);
    return lastMessages;
  };

  /**
   * Chat Rooms with last message get
   * @param {*} roomsData
   * @param {*} lastMessagesData
   * @returns
   */
  const chatRoomsWithLastMessageGet = async (roomsData, lastMessagesData) => {
    const mergedRooms = roomsData.map((room) => {
      const lastMessage = lastMessagesData.items.find((message) => message.room.uuid === room.uuid);
      return {
        ...room,
        last: lastMessage
          ? {
              uuid: lastMessage.uuid,
              content: lastMessage.content,
              alias: lastMessage.alias,
              user_uuid: lastMessage.user_uuid,
              created_at: new Date(lastMessage.created_at),
            }
          : null,
      };
    });
    const sortedRooms = chatRoomsSortByDate(mergedRooms);
    setChatRoomsWithLastMessage(sortedRooms);
    return sortedRooms;
  };

  /**
   * Chat Rooms Sort By Date
   * @param {*} rooms
   * @returns
   */
  const chatRoomsSortByDate = (rooms) => {
    const sorted = rooms.sort((a, b) => {
      if (a.last && b.last) {
        const dateA = new Date(a.last.created_at);
        const dateB = new Date(b.last.created_at);
        return dateB - dateA;
      } else if (a.last) {
        return -1;
      } else if (b.last) {
        return 1;
      } else {
        return 0;
      }
    });
    return sorted;
  };

  /**
   * chat room message send
   */
  const chatRoomMessageSend = async (room, chatMessage) => {
    await Wazo.chatd.sendRoomMessage(room.uuid, chatMessage);
  };

  /**
   * chat room search user
   * @param {*} term
   * @param {*} user
   * @returns
   */
  const chatRoomUserSearch = async (term, user) => {
    if (term.trim() === "") {
      return [];
    }
    try {
      const get = await Wazo.dird.search("default", term);
      if (get.length === 0) {
        return [];
      } else {
        const filteredResult = get.filter((item) => item.uuid !== user.uuid && item.backend == "wazo");
        return filteredResult;
      }
    } catch (error) {
      return [];
    }
  };

  const chatRoomsGetFull = async () => {
    const allRooms = await chatRoomsGet();
    const lastMessagesData = await chatRoomMessageLastGet();
    await chatRoomsWithLastMessageGet(allRooms, lastMessagesData);
  };

  /**
   * load presences array
   */
  useEffect(() => {
    return () => {
      setProcessedUsersPresence(new Set());
    };
  }, []);

  /**
   * set room
   */
  useEffect(() => {
    chatRoomRef.current = chatRoom;
    chatMessagesRef.current = chatMessages;
  }, [chatRoom, chatMessages]);

  return {
    chatRooms,
    setChatRooms,
    chatRoom,
    setChatRoom,
    chatRoomLastMessages,
    setChatRoomLastMessages,
    chatRoomsWithLastMessage,
    setChatRoomsWithLastMessage,
    chatMessages,
    setChatMessages,
    chatMessageUnread,
    setChatMessageUnread,
    chatRoomRef,
    chatMessagesRef,
    chatRoomCreate,
    chatRoomsGet,
    chatRoomLabelGet,
    chatRoomMessagesGet,
    chatRoomMessageLastGet,
    chatRoomsWithLastMessageGet,
    chatRoomsSortByDate,
    chatRoomMessageSend,
    chatRoomUserSearch,
    chatRoomsGetFull
  };
};

export default useChat;
