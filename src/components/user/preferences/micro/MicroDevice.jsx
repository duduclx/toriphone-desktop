import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { NativeSelectUi } from "../../../../ui";
import { useWazo } from "../../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const MicroDevice = () => {
  // api
  const { microDevice, setMicroDevice, audioInputDeviceChange } = useWazo();
  const { storagePrefsSet } = useAuth();

  // resources
  const [microDeviceList, setMicroDeviceList] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(microDevice);

  const handleMicroChange = (e) => {
    setSelectedCamera(e.target.value);
    setMicroDevice(e.target.value);
    storagePrefsSet({ microDevice: e.target.value });
    audioInputDeviceChange(e);
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioOutputDevices = devices.filter((device) => device.kind === "audioinput");

      const deviceOptions = audioOutputDevices.map((device) => ({
        value: device.deviceId,
        label: device.label,
      }));

      setMicroDeviceList(deviceOptions);
    });
  }, []);

  return (
    <Box width="70%">
      <NativeSelectUi value={selectedCamera} onChange={(e) => handleMicroChange(e)}>
        {microDeviceList.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </NativeSelectUi>
    </Box>
  );
};

export default MicroDevice;
