import { useState } from "react";

const useMeeting = ({ Wazo, apiClient }) => {
  // meetings
  const [meetings, setMeetings] = useState([]);
  const [meeting, setMeeting] = useState({});
  const [meetingRoom, setMeetingRoom] = useState(null);
  const [meetingNotification, setMeetingNotification] = useState({});
  const [meetingRoute, setMeetingRoute] = useState(false);
  const [meetingChatMessages, setMeetingChatMessages] = useState([]);
  const [meetingViewMode, setMeetingViewMode] = useState("gallery");
  const [meetingHideMe, setMeetingHideMe] = useState(false);
  const [meetingSidebarContent, setMeetingSidebarContent] = useState("none");

  /**
   * Meetings Get
   */
  const meetingsGet = async () => {
    const meetings = await Wazo.confd.getMyMeetings();
    setMeetings(meetings);
  };

  /**
   *
   * @param {*} meeting
   * @returns
   */
  const meetingGet = async (meeting) => {
    const res = await apiClient.client.get(`confd/1.1/meetings/${meeting.meetingUuid}`);
    setMeeting(res);
    return res;
  };

  /**
   * Meeting Create
   * @param {*} options
   * @returns
   */
  const meetingCreate = async (options) => {
    try {
      const meet = await Wazo.confd.createMyMeeting(options);
      setMeetings((prevmeetings) => {
        const updatedMeetings = [...prevmeetings, meet];
        return updatedMeetings;
      });
      return meet;
    } catch (e) {
      return e;
    }
  };

  /**
   * Meeting Update
   * @param {*} meeting
   * @param {*} options
   */
  const meetingUpdate = async (meeting, options) => {
    try {
      const meet = await Wazo.confd.updateMyMeeting(meeting.uuid, options);
      setMeetings((prevMeetings) => {
        const updatedMeetings = prevMeetings.map((item) => {
          if (item.uuid === meeting.uuid) {
            return {
              ...item,
              name: options.name,
              requireAuthorization: options.requireAuthorization,
              persistent: options.persistent
            };
          }
          return item;
        });
        return updatedMeetings;
      });
      return meet;
    } catch (e) {
      return e;
    }
  };

  /**
   * Meeting Delete
   * @param {*} meeting
   */
  const meetingDelete = async (meeting) => {
    const meet = await Wazo.confd.deleteMyMeeting(meeting.uuid);
    if (meet == true) {
      setMeetings((prevMeetings) => {
        const updatedMeetings = prevMeetings.filter((item) => item.uuid !== meeting.uuid);
        return updatedMeetings;
      });
    }
  };

  /**
   * Meeting Connect
   * @param {*} meeting
   */
  const meetingConnect = async (meeting) => {
    // connect
    const callSession = await Wazo.Phone.call(meeting.extension, true);
    // await Wazo.Phone.once(Wazo.Phone.ON_CALL_ACCEPTED, (data) => console.log("accepted", data));
    const room = await Wazo.Room.connect({
      extension: meeting.number,
      constraints: { audio: true, video: true },
      meeting: meeting,
    });
    // ajouter callSession a room.callSession sans perdre les méthodes
    room.extension = meeting.extension;
    callSession.callId = room.callId;
    room.callSession = callSession;

    room.on(room.ON_JOINED, () => {
      setMeetingRoom(room);
    });
  };

  /**
   * Meeting disconnect
   * @param {*} meetingRoom
   */
  const meetingDisconnect = async (meetingRoom) => {
    await meetingRoom.disconnect();
    return true;
  };

  /**
   * Meeting Participants Get
   * @param {*} meetingRoom
   * @returns
   */
  const meetingParticipantsGet = async (meetingRoom) => {
    const res = await apiClient.client.get(`calld/1.0/users/me/meetings/${meetingRoom.meetingUuid}/participants`);
    return res;
  };

  /**
   * Meeting Participant Kick
   * @param {*} meetingRoom
   * @param {*} participant
   * @returns
   */
  const meetingParticipantKick = async (meetingRoom, participant) => {
    const res = await apiClient.client.delete(
      `calld/1.0/users/me/meetings/${meetingRoom.meetingUuid}/participants/${participant.callId}`
    );
    return res;
  };

  /**
   * Meeting Status Get
   * @param {*} meetingRoom
   * @returns
   */
  const meetingStatusGet = async (meetingRoom) => {
    const res = await apiClient.client.get(`calld/1.0/guests/me/meetings/${meetingRoom.meetingUuid}/status`);
    return res;
  };

  /**
   * Meeting Authorizations Get
   * @param {*} meetingRoom 
   * @returns 
   */
  const meetingAuthorizationsGet = async (meetingRoom) => {
    const res = await apiClient.client.get(`confd/1.1/users/me/meetings/${meetingRoom.meetingUuid}/authorizations`);
    return res;
  };

  /**
   * Meeting authorization Get
   * @param {*} meetingRoom 
   * @param {*} authorization 
   * @returns 
   */
  const meetingAuthorizationGet = async (meetingRoom, authorization) => {
    const res = await apiClient.client.get(
      `confd/1.1/users/me/meetings/${meetingRoom.meetingUuid}/authorizations/${authorization.uuid}`
    );
    return res;
  };

  /**
   * Meeting Authorization Accept
   * @param {*} meetingRoom 
   * @param {*} authorization 
   * @returns 
   */
  const meetingAuthorizationAccept = async (meetingRoom, authorization) => {
    const meetingUuid = meetingRoom.meetingUuid || meetingRoom.meeting_uuid;
    const res = await apiClient.client.put(
      `confd/1.1/users/me/meetings/${meetingUuid}/authorizations/${authorization.uuid}/accept`
    );
    return res;
  };

  /**
   * Meeting Authorization Reject
   * @param {*} meetingRoom 
   * @param {*} authorization 
   * @returns 
   */
  const meetingAuthorizationReject = async (meetingRoom, authorization) => {
    const res = await apiClient.client.put(
      `confd/1.1/users/me/meetings/${meetingRoom.meetingUuid}/authorizations/${authorization.uuid}/reject`
    );
    return res;
  };

  /**
   * Meeting authorization Delete
   * @param {*} meetingRoom 
   * @param {*} authorization 
   * @returns 
   */
  const meetingAuthorizationDelete = async (meetingRoom, authorization) => {
    const res = await apiClient.client.delete(
      `confd/1.1/users/me/meetings/${meetingRoom.meetingUuid}/authorizations/${authorization.uuid}`
    );
    return res;
  };

  return {
    meetings,
    setMeetings,
    meeting,
    setMeeting,
    meetingRoom,
    setMeetingRoom,
    meetingNotification,
    setMeetingNotification,
    meetingRoute,
    setMeetingRoute,
    meetingChatMessages,
    setMeetingChatMessages,
    meetingViewMode,
    setMeetingViewMode,
    meetingHideMe,
    setMeetingHideMe,
    meetingSidebarContent,
    setMeetingSidebarContent,
    meetingsGet,
    meetingGet,
    meetingCreate,
    meetingUpdate,
    meetingDelete,
    meetingConnect,
    meetingDisconnect,
    meetingParticipantsGet,
    meetingParticipantKick,
    meetingStatusGet,
    meetingAuthorizationsGet,
    meetingAuthorizationGet,
    meetingAuthorizationAccept,
    meetingAuthorizationReject,
    meetingAuthorizationDelete
  };
};

export default useMeeting;
