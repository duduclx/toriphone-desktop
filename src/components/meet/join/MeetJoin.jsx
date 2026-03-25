import { useEffect, useState } from "react";

import { useAuth } from "toriphone-auth";
import { useWazo } from "../../../services/WazoProvider";

import MeetCall from "../call/MeetCall";
import MeetJoinLoading from "./MeetJoinLoading";
import MeetJoinError from "./MeetJoinError";
import MeetJoinGuest from "./MeetJoinGuest";
import MeetJoinUser from "./MeetJoinUser";

const MeetJoin = () => {
  // api
  const { user, Wazo } = useAuth();
  const { guestMeetingGet, meetingRoom, meeting, setMeeting } = useWazo();

  // error
  const [error, setError] = useState(false);

  // values
  const [guestUuid, setGuestUuid] = useState("");
  const [params, setParams] = useState({ server: null, uuid: null });
  const [guestName, setGuestName] = useState("");
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(false);

  // generate unique guest uuid
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // generate guest uuid
      const newGuestUuid = crypto.randomUUID();
      setGuestUuid(newGuestUuid);

      // extract URL params
      const urlParams = new URLSearchParams(window.location.search);
      const p = {
        server: urlParams.get("server"),
        uuid: urlParams.get("uuid"),
      };

      setParams(p);

      // fetch meeting
      if (p.server && p.uuid) {
        try {
          const res = await guestMeetingGet(p.server, p.uuid);
          const meeting = {
            creationTime: res.creation_time,
            extension: res.exten,
            guestSipAuthorization: res.guest_sip_authorization,
            name: res.name,
            ownerUuids: res.owner_uuids,
            requireAuthorization: res.require_authorization,
            persistent: res.persistent,
            uri: res.ingress_http_uri,
            uuid: res.uuid,
          };
          const newMeeting = new Wazo.domain.Meeting(meeting);
          setMeeting(newMeeting);
        } catch (err) {
          setError(true);
        }
      }

      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (user.profile) {
        setGuestName(user.profile.firstName + " " + user.profile.lastName);
      }
  }, [user]);

  if (loading) {
    return (
      <MeetJoinLoading />
    );
  }

  if (error) {
    return (
      <MeetJoinError />
    )
  }

  if (!user && !meetingRoom) {
    return (
      <MeetJoinGuest meeting={meeting} params={params} guestUuid={guestUuid} guestName={guestName} setGuestName={setGuestName} waiting={waiting} setWaiting={setWaiting} />
    );
  }

  if (user && !meetingRoom) {
    return (
      <MeetJoinUser meeting={meeting} params={params} guestUuid={guestUuid} guestName={guestName} waiting={waiting} setWaiting={setWaiting}/>
    )
  }

  if (meetingRoom) {
    return (
      <MeetCall />
    )
  }

};

export default MeetJoin;
