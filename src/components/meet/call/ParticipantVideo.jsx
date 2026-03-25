import { useEffect, useRef } from "react";

const ParticipantVideo = ({ participant }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const stream = participant.videoStreams?.[0]?.htmlStream;

    if (!videoRef.current) return;
    if (!stream) return;

    const video = videoRef.current;

    if (video.srcObject !== stream) {
      video.srcObject = stream;
    }

    const playVideo = () => {
      video.play().catch(() => {});
    };

    playVideo();

    // important pour resume()
    stream.getTracks().forEach((track) => {
      track.onunmute = playVideo;
    });

    return () => {
      stream.getTracks().forEach((track) => {
        track.onunmute = null;
      });
    };
  }, [participant.videoStreams]);

  return (
    <video
      key={participant.callId}
      ref={videoRef}
      autoPlay
      playsInline
      style={{
        borderRadius: "16px",
        background: "black",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: "translateZ(0)",
      }}
    />
  );
};

export default ParticipantVideo;
