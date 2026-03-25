import { Button, Box, IconButton } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaVideo, FaVideoSlash, FaPhoneSlash } from "react-icons/fa";
import { MdMic, MdMicOff, MdAirplay } from "react-icons/md";

import { useAuth } from "toriphone-auth";
import { useWazo } from "../../../../services/WazoProvider";

import ParticipantLocalVideo from "../ParticipantLocalVideo";

const MeetActions = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { user, Wazo } = useAuth();
  const { meetingRoom, setMeetingRoom, setAppCurrentPage, setMeetingRoute } = useWazo();

  // turn Camera On fixe
  const turnCameraOn = async () => {
    await meetingRoom.turnCameraOn();
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true });
    const localWazoStream = new Wazo.Stream(localStream);
    meetingRoom.localParticipant.resetStreams([localWazoStream]);
  };

  // resume need to be fixed
  const resume = async () => {
    await meetingRoom.resume();
  };

  const screenSharingStart = async () => {
    await meetingRoom.startScreenSharing({ audio: true, video: true });
    await addScreenTrack();
  };

  const screenSharingStop = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true });
    const localWazoStream = new Wazo.Stream(localStream);
    meetingRoom.localParticipant.resetStreams([localWazoStream]);
    await meetingRoom.stopScreenSharing();
  };

  const addScreenTrack = async () => {
    const session = Wazo.Phone.phone.currentSipSession;
    const newStream = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: "always" }, audio: false });
    const videoTracks = newStream.getVideoTracks();
    const pc = session.sessionDescriptionHandler.peerConnection;

    //setLocalShareStream(newStream);
    const localWazoStream = new Wazo.Stream(newStream);
    meetingRoom.localParticipant.resetStreams([localWazoStream]);
    pc.addTrack(videoTracks[0], newStream);

    session.sessionDescriptionHandler.peerConnection.getSenders()[1].replaceTrack(videoTracks[0]);
  };

  // disconnect
  const disconnect = () => {
    meetingRoom.disconnect();
    setMeetingRoom(null);
    if (user) {
      setAppCurrentPage("meet");
      window.history.pushState({}, "", "/");
      setMeetingRoute(false);
    }
  };

  return (
    <>
      {/*
        <IconButton
          variant="ghost"
          colorPalette={meetingRoom.localParticipant.isOnHold ? "yellow" : "secondary"}
          onClick={() => (meetingRoom.localParticipant.isOnHold ? resume() : meetingRoom.hold())}
        >
          {meetingRoom.localParticipant.isOnHold ? <MdPause /> : <MdPlayArrow />}
        </IconButton>
        */}

      <IconButton
        variant="ghost"
        colorPalette={meetingRoom.localParticipant.audioMuted ? "danger" : "secondary"}
        onClick={() => (meetingRoom.localParticipant.audioMuted ? meetingRoom.unmute() : meetingRoom.mute())}
      >
        {meetingRoom.localParticipant.audioMuted ? <MdMicOff /> : <MdMic />}
      </IconButton>

      <IconButton
        variant="ghost"
        colorPalette={meetingRoom.localParticipant.videoMuted ? "danger" : "secondary"}
        onClick={() => (meetingRoom.localParticipant.videoMuted ? turnCameraOn() : meetingRoom.turnCameraOff())}
      >
        {meetingRoom.localParticipant.videoMuted ? <FaVideoSlash /> : <FaVideo />}
      </IconButton>

      <IconButton
        variant="ghost"
        colorPalette={meetingRoom.localParticipant.screensharing ? "primary" : "secondary"}
        onClick={() => (meetingRoom.localParticipant.screensharing ? screenSharingStop() : screenSharingStart())}
      >
        <MdAirplay />
      </IconButton>

      {/* LOCAL VIDEO */}
      <Box>
        <ParticipantLocalVideo participant={meetingRoom.localParticipant} />
      </Box>
      <Button colorPalette="danger" onClick={() => disconnect()}>
        <FaPhoneSlash /> {t("meetings.leave")}
      </Button>
    </>
  );
};

export default MeetActions;
