import { useEffect, useRef } from "react";

const ParticipantLocalVideo = ({ participant }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    const stream = participant.videoStreams?.[0]?.htmlStream;

    if (!videoEl || !stream) return;

    if (videoEl.srcObject !== stream) {
      videoEl.srcObject = stream;

      videoEl.muted = true;

      videoEl.onloadedmetadata = () => {
        videoEl.play().catch(() => {});
      };
    }

  }, [participant.videoStreams?.[0]?.htmlStream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{
        borderRadius: "16px",
        width: "100px",
        height: "100%",
        maxWidth: "100px",
        maxHeight: "75px",
        zIndex: 2,
      }}
    />
  );
};

export default ParticipantLocalVideo;