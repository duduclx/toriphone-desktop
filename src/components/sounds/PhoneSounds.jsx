import { useEffect } from "react";

import { useWazo } from "../../services/WazoProvider";

const PhoneSounds = () => {
  const { audioRef, ringtone, ringDevice, ringVolume } = useWazo();

  useEffect(() => {
    const audio = audioRef.current;
    const deviceId = ringDevice; // Récupérez l'ID du périphérique audio sélectionné

    // Vérifiez si l'élément audio et l'ID du périphérique sont définis
    if (audio && deviceId) {
      // Utilisez l'API setSinkId pour définir le périphérique de sortie audio
      if (typeof audio.setSinkId !== "undefined") {
        audio.setSinkId(deviceId);
      }
      audio.volume = ringVolume / 100;
    }
  }, [audioRef, ringDevice]);

  return <audio ref={audioRef} src={ringtone} />;
};

export default PhoneSounds;
