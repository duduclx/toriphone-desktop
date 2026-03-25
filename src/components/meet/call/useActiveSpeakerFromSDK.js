import { useEffect, useState } from "react";

const SPEAKER_HOLD_TIME = 2000;

export const useActiveSpeakerFromSDK = (participants) => {
  const [activeSpeakerId, setActiveSpeakerId] = useState(null);
  const [lastSwitch, setLastSwitch] = useState(0);

  useEffect(() => {
    if (!activeSpeakerId) return;

    const stillExists = participants.some((p) => p.callId === activeSpeakerId);

    if (!stillExists) {
      setActiveSpeakerId(null);
    }
  }, [participants, activeSpeakerId]);

  useEffect(() => {
    const now = Date.now();
    const talking = participants.find((p) => p.isTalking);

    if (talking && (!activeSpeakerId || (talking.callId !== activeSpeakerId && now - lastSwitch > SPEAKER_HOLD_TIME))) {
      setActiveSpeakerId(talking.callId);
      setLastSwitch(now);
    }
  }, [participants, activeSpeakerId, lastSwitch]);

  return activeSpeakerId;
};
