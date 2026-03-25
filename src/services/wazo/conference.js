import { useState } from "react";

const useConference = ({ apiClient }) => {
  // values
  const [conferences, setConferences] = useState([]);
  const [conference, setConference] = useState({});
  const [conferenceRoom, setConferenceRoom] = useState(null);

  /**
   * confd
   * Conferences Get
   */
  const conferencesGet = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/conferences?recurse=false`);
      setConferences(res);
      return res;
    } catch (e) {
      setConferences([]);
      return [];
    }
  };

  /**
   * confd
   * Conference Get
   * @param {*} conference 
   * @returns 
   */
  const conferenceGet = async (conference) => {
    const conferenceId = conference.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/conferences/${conferenceId}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * confd
   * Conference Add
   * @param {*} conference 
   * @returns 
   */
  const conferenceAdd = async (conference) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/conferences`, conference);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * confd
   * Conference Update
   * @param {*} conference 
   * @returns 
   */
  const conferenceUpdate = async (conference) => {
    const conferenceId = conference.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/conferences/${conferenceId}`, conference);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * confd
   * Conference Delete
   * @param {*} conference 
   * @returns 
   */
  const conferenceDelete = async (conference) => {
    const conferenceId = conference.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/conferences/${conferenceId}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * confd
   * Conference Associate Extension
   * @param {*} conference 
   * @param {*} extension 
   * @returns 
   */
  const conferenceAssociateExtension = async (conference, extension) => {
    const conferenceId = conference.id;
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/conferences/${conferenceId}/extensions/${extensionId}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * confd
   * Conference Dissociate Extension
   * @param {*} conference 
   * @param {*} extension 
   * @returns 
   */
  const conferenceDissociateExtension = async (conference, extension) => {
    const conferenceId = conference.id;
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/conferences/${conferenceId}/extensions/${extensionId}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * calld
   * Conference Participants Get
   * @param {*} conference 
   * @returns 
   */
  const conferenceParticipantsGet = async (conference) => {
    const conferenceId = conference.id;
    try {
      const res = await apiClient.client.get(`calld/1.0/conferences/${conferenceId}/participants`);
    } catch (e) {
      return e;
    }
  }

  /**
   * calld
   * Conference Participant Kick
   * @param {*} conference 
   * @param {*} participant 
   * @returns 
   */
  const conferenceParticipantKick = async (conference, participant) => {
    const conferenceId = conference.id;
    const participantId = participant.id;
    try {
      const res = await apiClient.client.delete(`calld/1.0/conferences/${conferenceId}/participants/${participantId}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * calld
   * Conference Participant Mute
   * @param {*} conference 
   * @param {*} participant 
   * @returns 
   */
  const conferenceParticipantMute = async (conference, participant) => {
    const conferenceId = conference.id;
    const participantId = participant.id;
    try {
      const res = await apiClient.client.put(`calld/1.0/conferences/${conferenceId}/participants/${participantId}/mute`);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * calld
   * Conference Participant Unmute
   * @param {*} conference 
   * @param {*} participant 
   * @returns 
   */
  const conferenceParticipantUnmute = async (conference, participant) => {
    const conferenceId = conference.id;
    const participantId = participant.id;
    try {
      const res = await apiClient.client.put(`calld/1.0/conferences/${conferenceId}/participants/${participantId}/unmute`);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * calld
   * Conference Record Start
   * @param {*} conference 
   * @returns 
   */
  const conferenceRecordStart = async (conference) => {
    const conferenceId = conference.id;
    try {
      const res = await apiClient.client.put(`calld/1.0/conferences/${conferenceId}/record`);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * calld
   * Conference Record Stop
   * @param {*} conference 
   * @returns 
   */
  const conferenceRecordStop = async (conference) => {
    const conferenceId = conference.id;
    try {
      const res = await apiClient.client.delete(`calld/1.0/conferences/${conferenceId}/record`);
      return res;
    } catch (e) {
      return e;
    }
  }

  return {
    conferences,
    setConferences,
    conference,
    setConference,
    conferenceRoom,
    setConferenceRoom,
    conferencesGet,
    conferenceGet,
    conferenceAdd,
    conferenceUpdate,
    conferenceDelete,
    conferenceAssociateExtension,
    conferenceDissociateExtension,
    conferenceParticipantsGet,
    conferenceParticipantKick,
    conferenceParticipantMute,
    conferenceParticipantUnmute,
    conferenceRecordStart,
    conferenceRecordStop
  };
};

export default useConference;
