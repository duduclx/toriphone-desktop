import { useState } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { FaPhoneSlash, FaCompress, FaExpand, FaCommentAlt } from "react-icons/fa";
import { MdMic, MdMicOff, MdPause, MdPlayArrow, MdVideocam, MdVideocamOff, MdAirplay } from "react-icons/md";

import { useWazo } from "../../../../services/WazoProvider";

const VideoToolbar = () => {
  const {
    callSession,
    hold,
    unhold,
    mute,
    unmute,
    turnCameraOff,
    turnCameraOn,
    startScreenSharing,
    stopScreenSharing,
    hangUpCall,
    fullScreenToggle,
    isFullScreen,
    toggleChat,
    handleToggleChat,
  } = useWazo();

  const [camera, setCamera] = useState(true);
  const [share, setShare] = useState(false);

  const handleTogglePause = async () => {
    if (callSession.paused) {
      await unhold(callSession);
    } else {
      hold(callSession);
    }
    if (callSession.videoMuted) {
      cameraOff();
    }
  };

  const turnCameraOnOff = () => {
    if (camera) {
      cameraOff();
    } else {
      cameraOn();
    }
  };

  const cameraOff = () => {
    setCamera(false);
    turnCameraOff(callSession);
  };

  const cameraOn = () => {
    setCamera(true);
    turnCameraOn(callSession);
  };

  const shareOnOff = () => {
    if (share) {
      shareOff();
    } else {
      shareOn();
    }
  };

  const shareOn = async () => {
    setShare(true);
    await startScreenSharing(callSession);
  };

  const shareOff = () => {
    setShare(false);
    stopScreenSharing();
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
        width="100%"
        gap="8"
        my="4"
        position="absolute"
        bottom="0"
        left="0"
        className="bottom-buttons"
        transform="translateY(100%)"
        transition="all 0.3s ease"
        visibility="hidden"
      >
        <IconButton
          rounded="100%"
          size="lg"
          colorPalette={callSession.paused ? "warning" : "secondary"}
          onClick={handleTogglePause}
        >
          {callSession.paused ? <MdPlayArrow /> : <MdPause />}
        </IconButton>
        <IconButton
          rounded="100%"
          size="lg"
          colorPalette={callSession.muted ? "danger" : "secondary"}
          onClick={() => (callSession.muted ? unmute(callSession) : mute(callSession))}
        >
          {callSession.muted ? <MdMicOff color="danger" /> : <MdMic color="secondary" />}
        </IconButton>
        <IconButton
          rounded="100%"
          size="lg"
          colorPalette={callSession.videoMuted ? "danger" : "secondary"}
          onClick={() => turnCameraOnOff()}
        >
          {callSession.videoMuted ? <MdVideocamOff /> : <MdVideocam />}
        </IconButton>
        <IconButton rounded="100%" size="lg" colorPalette={share ? "danger" : "secondary"} onClick={() => shareOnOff()}>
          <MdAirplay />
        </IconButton>
        <IconButton rounded="100%" size="lg" colorPalette={isFullScreen ? "danger" : "secondary"} onClick={() => fullScreenToggle()}>
          {isFullScreen ? <FaCompress /> : <FaExpand />}
        </IconButton>
        {isFullScreen && (
          <IconButton rounded="100%" size="lg" colorPalette={toggleChat ? "secondary" : "danger"} onClick={() => handleToggleChat()}>
            <FaCommentAlt />
          </IconButton>
        )}
        <IconButton rounded="100%" size="lg" colorPalette="danger" onClick={() => hangUpCall(callSession)}>
          <FaPhoneSlash />
        </IconButton>
      </Box>
    </>
  );
};

export default VideoToolbar;
