import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { NativeSelectUi } from "../../../../ui";
import { useWazo } from "../../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const CameraDevice = () => {
  // api
  const { cameraDevice, setCameraDevice, videoInputChange } = useWazo();
  const { storagePrefsSet } = useAuth();

  // states
  const [cameraDeviceList, setCameraDeviceList] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(cameraDevice);

  const handleAudioChange = (e) => {
    setSelectedCamera(e.target.value);
    setCameraDevice(e.target.value);
    storagePrefsSet({ cameraDevice: e.target.value });
    videoInputChange(e);
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioOutputDevices = devices.filter((device) => device.kind === "videoinput");

      const deviceOptions = audioOutputDevices.map((device) => ({
        value: device.deviceId,
        label: device.label,
      }));

      setCameraDeviceList(deviceOptions);
    });
  }, []);

  return (
    <Box width="70%">
      <NativeSelectUi value={selectedCamera} onChange={(e) => handleAudioChange(e)}>
        {cameraDeviceList.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </NativeSelectUi>
    </Box>
  );
};

export default CameraDevice;
