import { Box, Slider } from "@chakra-ui/react";

import { useWazo } from "../../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const RingVolume = () => {
  // api
  const { ringVolume, setRingVolume } = useWazo();
  const { storagePrefsSet } = useAuth();

  // resources
  let timeout;

  const onVolumeChange = (newVolume) => {
    clearTimeout(timeout);
    setRingVolume(newVolume);
    timeout = setTimeout(() => {
      storagePrefsSet({ ringVolume: newVolume });
    }, 1000);
  };

  return (
    <Box p="4" width="70%">
      <Slider.Root colorPalette="primary" min={0} max={100} value={[ringVolume]} onValueChange={(e) => onVolumeChange(e.value)}>
        <Slider.Marker p="4">{ringVolume}%</Slider.Marker>
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

export default RingVolume;
