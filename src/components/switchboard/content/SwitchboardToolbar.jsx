import { IconButton } from "@chakra-ui/react";
import { useWazo } from "../../../services/WazoProvider"
import AudioToolbar from "../../phone/call/toolsbar/AudioToolbar"
import { MdPause } from "react-icons/md";

const SwitchboardToolbar = () => {
    // api
    const { callSession, switchboardCallPause } = useWazo();

  return (
    <div>
      <AudioToolbar />
      {/*
      callSession.switchboard?.isSwitchboardCall && (
        <IconButton
        rounded="100%"
        colorPalette="primary"
        onClick={() => switchboardCallPause(callSession)}
        ><MdPause /></IconButton>
      )
        */}
    </div>
  )
}

export default SwitchboardToolbar
