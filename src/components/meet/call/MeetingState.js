import { useEffect, useState, useRef } from "react";

export const useMeetingState = (meeting) => {

  const participantsRef = useRef(new Map());

  const [participants, setParticipants] = useState([]);
  const [local, setLocal] = useState({});

  useEffect(() => {
    if (!meeting) return;

    const lp = meeting.localParticipant;

    const syncParticipants = () => {

      meeting.participants.forEach((p) => {

        if (!participantsRef.current.has(p.callId)) {

          participantsRef.current.set(p.callId, {
            callId: p.callId,
            name: p.name,
            uuid: p.uuid,
            audioMuted: p.audioMuted,
            videoMuted: p.videoMuted,
            isOnHold: p.isOnHold,
            isTalking: p.audioMuted ? false : p.isTalking,
            screensharing: p.screensharing,
          });

        }

      });

      setParticipants(Array.from(participantsRef.current.values()));
    };

    const updateParticipant = (callId, patch) => {

  const p = participantsRef.current.get(callId);
  if (!p) return;

  const updated = {
    ...p,
    ...patch
  };

  // sécurité : micro muté → pas de talking
  if (updated.audioMuted) {
    updated.isTalking = false;
  }

  participantsRef.current.set(callId, updated);

  setParticipants(Array.from(participantsRef.current.values()));
};

    const attachParticipantListeners = (p) => {

      const startTalking = () =>
        updateParticipant(p.callId, { isTalking: true });

      const stopTalking = () =>
        updateParticipant(p.callId, { isTalking: false });

      const startScreenSharing = () =>
        updateParticipant(p.callId, { screenSharing: true});

      const stopScreenSharing = () =>
        updateParticipant(p.callId, { screenSharing: false});

      p.on(p.ON_START_TALKING, startTalking);
      p.on(p.ON_STOP_TALKING, stopTalking);
      p.on(p.ON_SCREENSHARING, startScreenSharing);
      p.on(p.ON_STOP_SCREENSHARING, stopScreenSharing);

      return () => {
        p.off(p.ON_START_TALKING, startTalking);
        p.off(p.ON_STOP_TALKING, stopTalking);
        p.off(p.ON_SCREENSHARING, startScreenSharing);
        p.off(p.ON_STOP_SCREENSHARING, stopScreenSharing);
      };
    };

    const detachFns = meeting.participants.map(attachParticipantListeners);

    const onParticipantJoined = (p) => {

      participantsRef.current.set(p.callId, {
        callId: p.callId,
        name: p.name,
        uuid: p.uuid,
        audioMuted: p.audioMuted,
        videoMuted: p.videoMuted,
        isOnHold: p.isOnHold,
        isTalking: p.isTalking,
        screensharing: p.screensharing,
      });

      detachFns.push(attachParticipantListeners(p));

      setParticipants(Array.from(participantsRef.current.values()));
    };

    const onParticipantLeft = (p) => {

      participantsRef.current.delete(p.callId);

      setParticipants(Array.from(participantsRef.current.values()));
    };

    meeting.on(meeting.CONFERENCE_USER_PARTICIPANT_JOINED, onParticipantJoined);
    meeting.on(meeting.CONFERENCE_USER_PARTICIPANT_LEFT, onParticipantLeft);

    const updateLocal = () => {

      setLocal({
        audioMuted: lp.audioMuted,
        videoMuted: lp.videoMuted,
        isOnHold: lp.isOnHold,
        isTalking: lp.audioMuted ? false : lp.isTalking,
        screensharing: lp.screensharing,
      });

    };

    lp.on(lp.ON_AUDIO_MUTED, updateLocal);
    lp.on(lp.ON_AUDIO_UNMUTED, updateLocal);
    lp.on(lp.ON_VIDEO_MUTED, updateLocal);
    lp.on(lp.ON_VIDEO_UNMUTED, updateLocal);
    lp.on(lp.ON_HOLD, updateLocal);
    lp.on(lp.ON_RESUME, updateLocal);
    lp.on(lp.ON_START_TALKING, updateLocal);
    lp.on(lp.ON_STOP_TALKING, updateLocal);
    lp.on(lp.ON_SCREENSHARING, updateLocal);
    lp.on(lp.ON_STOP_SCREENSHARING, updateLocal);

    syncParticipants();
    updateLocal();

    return () => {

      detachFns.forEach((fn) => fn());

      meeting.off(meeting.CONFERENCE_USER_PARTICIPANT_JOINED, onParticipantJoined);
      meeting.off(meeting.CONFERENCE_USER_PARTICIPANT_LEFT, onParticipantLeft);

      lp.off(lp.ON_AUDIO_MUTED, updateLocal);
      lp.off(lp.ON_AUDIO_UNMUTED, updateLocal);
      lp.off(lp.ON_VIDEO_MUTED, updateLocal);
      lp.off(lp.ON_VIDEO_UNMUTED, updateLocal);
      lp.off(lp.ON_HOLD, updateLocal);
      lp.off(lp.ON_RESUME, updateLocal);
      lp.off(lp.ON_START_TALKING, updateLocal);
      lp.off(lp.ON_STOP_TALKING, updateLocal);
    };

  }, [meeting]);

  return {
    local,
    participants
  };
};