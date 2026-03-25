import { useState, useEffect } from "react";
import { NativeSelectUi } from "../../../../ui";
import { useWazo } from "../../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";
import { Box } from "@chakra-ui/react";

const RingDevice = () => {
  // api
  const { ringDevice, setRingDevice } = useWazo();
  const { storagePrefsSet } = useAuth();

  // states
  const [ringDeviceList, setRingDeviceList] = useState([]);
  const [selectedRingOutput, setSelectedRingOutput] = useState(ringDevice);

  const handleRingChange = (e) => {
    setSelectedRingOutput(e.target.value);
    setRingDevice(e.target.value);
    storagePrefsSet({ ringDevice: e.target.value });
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioOutputDevices = devices.filter((device) => device.kind === "audiooutput");

      const deviceOptions = audioOutputDevices.map((device) => ({
        value: device.deviceId,
        label: device.label,
      }));

      setRingDeviceList(deviceOptions);
    });
  }, []);

  return (
    <Box width="70%">
      <NativeSelectUi value={selectedRingOutput} onChange={(e) => handleRingChange(e)}>
        {ringDeviceList.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </NativeSelectUi>
    </Box>
  );
};

export default RingDevice;
