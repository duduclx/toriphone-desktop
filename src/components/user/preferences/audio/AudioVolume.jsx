import { Box, Slider } from "@chakra-ui/react";

import { useWazo } from "../../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const AudioVolume = () => {
  // api
  const { audioVolume, setAudioVolume } = useWazo();
  const { storagePrefsSet } = useAuth();

  // resource
  let timeout;

  const onVolumeChange = (newVolume) => {
    clearTimeout(timeout);
    setAudioVolume(newVolume);
    timeout = setTimeout(() => {
      storagePrefsSet({ audioVolume: newVolume });
    }, 1000);
  };

  return (
    <Box p="4" width="70%">
      <Slider.Root colorPalette="primary" min={0} max={100} value={[audioVolume]} onValueChange={(e) => onVolumeChange(e.value)}>
        <Slider.Marker p="4">{audioVolume}%</Slider.Marker>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    </Box>
  );
};

export default AudioVolume;
