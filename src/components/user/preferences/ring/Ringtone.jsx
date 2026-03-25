import { NativeSelectUi } from "../../../../ui";
import { useWazo } from "../../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";
import ringtonesList from "./RingtonesList";

const Ringtone = () => {
  // api
  const { ringtone, setRingtone } = useWazo();
  const { storagePrefsSet } = useAuth();

  // update ringtone
  const handleSelectChange = (event) => {
    setRingtone(event.target.value);
    storagePrefsSet({ ringtone: event.target.value });
  };

  return (
    <NativeSelectUi value={ringtone} onChange={(event) => handleSelectChange(event)}>
      {ringtonesList.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </NativeSelectUi>
  );
};

export default Ringtone;
