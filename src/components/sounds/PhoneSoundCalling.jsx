import { useWazo } from "../../services/WazoProvider";

const PhoneSoundCalling = () => {
  const { callingRef, callTone } = useWazo();

  return <audio ref={callingRef} src={callTone} />;
};

export default PhoneSoundCalling;
