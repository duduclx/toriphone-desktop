const useGuests = ({ Wazo, setMeetingRoom }) => {
  /**
   * helper générique pour fetch côté guest
   * @param {*} url
   * @param {*} options
   * @returns
   */
  const guestFetch = async (url, options = {}) => {
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      return await res.json();
    } catch (err) {
      console.error("Guest API error:", err);
      throw err;
    }
  };

  /**
   * Guest Meeting Get
   * Récupérer les infos de la réunion (guest)
   * GET /guests/me/meetings/:uuid
   * @param {*} server
   * @param {*} meetingUuid
   * @returns
   */
  const guestMeetingGet = async (server, meetingUuid) => {
    const url = `https://${server}/api/confd/1.1/guests/me/meetings/${meetingUuid}`;

    return await guestFetch(url, {
      method: "GET",
    });
  };

  /**
   * Guest Meeting Authorization Request
   * Envoyer une demande d’autorisation
   * POST /guests/:guestUuid/meetings/:meetingUuid/authorizations
   * body: { "guest_name": "xxx" }
   * @param {*} server
   * @param {*} meetingUuid
   * @param {*} guestUuid
   * @param {*} guestName
   * @returns
   */
  const guestMeetingAuthorizationRequest = async (server, meetingUuid, guestUuid, guestName) => {
    const url = `https://${server}/api/confd/1.1/guests/${guestUuid}/meetings/${meetingUuid}/authorizations`;

    return await guestFetch(url, {
      method: "POST",
      body: JSON.stringify({
        guest_name: guestName,
      }),
    });
  };

  /**
   * Guest Meeting Authorization Get
   * Vérifier l’état d’une autorisation
   * GET /guests/:guestUuid/meetings/:meetingUuid/authorizations/:authorizationUuid
   * @param {*} server
   * @param {*} meetingUuid
   * @param {*} guestUuid
   * @param {*} authorizationUuid
   * @returns
   */
  const guestMeetingAuthorizationGet = async (server, meetingUuid, guestUuid, authorizationUuid) => {
    const url = `https://${server}/api/confd/1.1/guests/${guestUuid}/meetings/${meetingUuid}/authorizations/${authorizationUuid}`;

    return await guestFetch(url, {
      method: "GET",
    });
  };

  /**
   * Guest Meeting Connect
   * @param {*} meeting 
   * @param {*} server 
   * @param {*} guestName 
   * @param {*} credentials 
   */
  const guestMeetingConnect = async (meeting, server, guestName, credentials) => {

    const options = {
      media: {
        audio: true,
        video: false,
      },
    }

    // connect
    let connect = await Wazo.Phone.connectWithCredentials(server, credentials, guestName, options);
    
    // call
    const callSession = await Wazo.Phone.call(meeting.extension, true);
    // await Wazo.Phone.once(Wazo.Phone.ON_CALL_ACCEPTED, (data) => console.log("accepted", data));
    const room = await Wazo.SipRoom.connect({
      extension: "meeting-guest",
      constraints: { audio: true, video: true },
      meeting: meeting,
    });
    // ajouter callSession a room.callSession sans perdre les méthodes
    room.extension = meeting.extension;
    //callSession.callId = room.callId;
    room.callSession = callSession;

    room.on(room.ON_JOINED, (data) => {
      Object.assign(room, data);
      setMeetingRoom(room); 
    });
  };

  return {
    guestMeetingGet,
    guestMeetingAuthorizationRequest,
    guestMeetingAuthorizationGet,
    guestMeetingConnect
  };
};

export default useGuests;
