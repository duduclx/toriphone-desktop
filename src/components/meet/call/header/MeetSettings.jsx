import { useState, useEffect } from "react";
import { Box, IconButton, Field, Flex, Popover, Portal, Slider } from "@chakra-ui/react";
import { NativeSelectUi } from "../../../../ui";
import { FaCogs } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import CameraDevice from "../../../user/preferences/camera/CameraDevice";
import AudioVolume from "../../../user/preferences/audio/AudioVolume";

const MeetSettings = () => {
  // requirements
  const { t } = useTranslation();

  // values
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [audioVolume, setAudioVolume] = useState(100);

  // 🎤 récupérer les devices audio
  useEffect(() => {
    const loadDevices = async () => {
      const all = await navigator.mediaDevices.enumerateDevices();
      const inputs = all.filter((d) => d.kind === "audioinput");
      setDevices(inputs);
    };

    loadDevices();
  }, []);

  const selectDevice = async (deviceId) => {
    setSelectedDevice(deviceId);

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId },
    });

    // inject dans Wazo
    const track = stream.getAudioTracks()[0];
    const sender = meetingRoom?.session?.sessionDescriptionHandler?.peerConnection
      ?.getSenders()
      ?.find((s) => s.track?.kind === "audio");

    if (sender) {
      await sender.replaceTrack(track);
    }
  };
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButton variant="ghost">
          <FaCogs />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content bg="bgElevated" p="4" minW="260px">
            <Flex flexDirection="column" gap="4" alignItems="flex-start">
              <Field.Root>
                <Field.Label>Sélection du micro :</Field.Label>
                <Box width="100%">
                  <NativeSelectUi value={selectedDevice} onChange={(e) => console.log(e)}>
                    {devices.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </NativeSelectUi>
                </Box>
              </Field.Root>
              <Field.Root>
                <Field.Label>Choix de la caméra</Field.Label>
                <CameraDevice />
              </Field.Root>

              {/* 🔊 Volume (placeholder) */}
              <Field.Root>
                <Field.Label>Volume de la communication</Field.Label>
                <AudioVolume />
                <Box width="100%" p="2">
                  <Slider.Root
                    colorPalette="primary"
                    min={0}
                    max={100}
                    value={[audioVolume]}
                    onValueChange={(e) => setAudioVolume(e.value)}
                  >
                    <Slider.Marker p="4">{audioVolume}%</Slider.Marker>
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Range />
                      </Slider.Track>
                      <Slider.Thumbs />
                    </Slider.Control>
                  </Slider.Root>
                </Box>
              </Field.Root>
            </Flex>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default MeetSettings;
