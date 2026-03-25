import { useState, useEffect } from "react";
import { NativeSelectUi } from "../../../../ui";
import { useWazo } from "../../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const AudioDevice = () => {
  // api
  const { audioDevice, setAudioDevice, audioDeviceChange } = useWazo();
  const { storagePrefsSet } = useAuth();

  // states
  const [audioDeviceList, setAudioDeviceList] = useState([]);
  const [selectedAudioOutput, setSelectedaudioOutput] = useState(audioDevice);

  const handleAudioChange = (e) => {
    setSelectedaudioOutput(e.target.value);
    setAudioDevice(e.target.value);
    storagePrefsSet({ audioDevice: e.target.value });
    audioDeviceChange(e);
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioOutputDevices = devices.filter((device) => device.kind === "audiooutput");

      const deviceOptions = audioOutputDevices.map((device) => ({
        value: device.deviceId,
        label: device.label,
      }));

      setAudioDeviceList(deviceOptions);
    });
  }, []);

  return (
    <NativeSelectUi value={selectedAudioOutput} onChange={(e) => handleAudioChange(e)}>
      {audioDeviceList.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </NativeSelectUi>
  );
};

export default AudioDevice;
