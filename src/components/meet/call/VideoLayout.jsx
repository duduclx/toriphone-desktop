import { useWazo } from "../../../services/WazoProvider";

import { useActiveSpeakerFromSDK } from "./useActiveSpeakerFromSDK";
import VideoGrid from "./VideoGrid";
import VideoSidebar from "./VideoSidebar";
import VideoPresentation from "./VideoPresentation";

const VideoLayout = () => {
  // api
  const { meetingRoom, meetingViewMode, meetingHideMe } = useWazo();

  // participants
  const participants = meetingHideMe
  ? meetingRoom.participants.filter(
      (p) => p.callId !== meetingRoom.localParticipant?.callId
    )
  : meetingRoom.participants;

  // active speaker
  const activeSpeakerId = useActiveSpeakerFromSDK(participants);

  if (meetingViewMode === "side") {
    return <VideoSidebar participants={participants} activeSpeakerId={activeSpeakerId} />;
  }

  if (meetingViewMode === "gallery") {
    return <VideoGrid participants={participants} />
  }

  if (meetingViewMode === "presentation") {
    return <VideoPresentation participants={participants} activeSpeakerId={activeSpeakerId}/>
  }
};

export default VideoLayout;
