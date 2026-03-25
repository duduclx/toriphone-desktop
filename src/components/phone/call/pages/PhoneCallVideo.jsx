import { useRef, useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaPause, FaVideoSlash } from "react-icons/fa";

import { useWazo } from "../../../../services/WazoProvider";
import VideoToolbar from "../toolsbar/VideoToolbar";

const PhoneCallVideo = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { callSession, localStream, localShareStream, remoteStream, isFullScreen } = useWazo();

  // states
  const localVideo = useRef();
  const remoteVideo = useRef();
  const [remoteCameraActive, setRemoteCameraActive] = useState(true);

  // Affiche local stream (normal ou partage d'écran)
  useEffect(() => {
    const stream = localShareStream || localStream;
    if (localVideo.current) {
      if (stream) {
        localVideo.current.srcObject = stream;
        localVideo.current.onloadedmetadata = () => {
          localVideo.current.play().catch((e) => {
            console.warn("Erreur lecture vidéo locale :", e);
          });
        };
      } else {
        localVideo.current.srcObject = null;
      }
    }
  }, [localStream, localShareStream]);

  // Affiche remote stream
  useEffect(() => {
    if (remoteStream && remoteVideo.current) {
      remoteVideo.current.srcObject = remoteStream;
      // remoteVideo.current.muted = true; l'audio n'est pas lié à la vidéo
      remoteVideo.current.onloadedmetadata = () => {
        remoteVideo.current.play().catch((e) => {
          console.warn("Erreur lecture vidéo distante :", e);
        });
      };
    }
  }, [remoteStream]);

  // Gère la caméra distante activée/désactivée
  useEffect(() => {
    if (!remoteStream) return;

    const videoTrack = remoteStream.getVideoTracks()[0];
    if (!videoTrack) return;

    const handleMute = () => {
      setRemoteCameraActive(false);
    };

    const handleUnmute = () => {
      setRemoteCameraActive(true);
    };

    videoTrack.onmute = handleMute;
    videoTrack.onunmute = handleUnmute;

    setRemoteCameraActive(videoTrack.enabled);

    return () => {
      videoTrack.onmute = null;
      videoTrack.onunmute = null;
    };
  }, [remoteStream]);

  return (
    <Flex justifyContent="center" flex="1" alignItems="center">
      {Object.keys(callSession).length > 0 && (
        <Box position="relative" boxShadow="lg" borderRadius="16px">
          {/* Vidéo locale ou pause */}
          {callSession.paused ? (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="120px"
              height="90px"
              borderRadius="16px"
              bg="bgPrimary"
              display="flex"
              alignItems="center"
              justifyContent="center"
              zIndex={2}
            >
              <FaPause size="24px" />
            </Box>
          ) : callSession.videoMuted ? (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="120px"
              height="90px"
              borderRadius="16px"
              bg="bgPrimary"
              display="flex"
              alignItems="center"
              justifyContent="center"
              zIndex={2}
            >
              <FaVideoSlash size="24px" />
            </Box>
          ) : (
            <video
              ref={localVideo}
              autoPlay
              playsInline
              muted
              style={{
                borderRadius: "16px",
                position: "absolute",
                top: 0,
                left: 0,
                maxWidth: "120px",
                height: "auto",
                zIndex: 2,
              }}
            />
          )}

          {/* Vidéo distante + overlay si caméra inactive */}
          <Box
            position="relative"
            css={{
              "&:hover .bottom-buttons": {
                transform: "translateY(0)",
                visibility: "visible",
              },
            }}
            overflow="hidden"
            borderRadius="16px"
          >
            {!remoteCameraActive && (
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                bg="blackAlpha.700"
                borderRadius="16px"
                px="4"
                py="2"
                zIndex="3"
              >
                <Text color="white" fontSize="lg" fontWeight="semibold">
                  {callSession?.displayName || t("phone.camera_off")}
                </Text>
              </Box>
            )}
            <video
              ref={remoteVideo}
              autoPlay
              muted
              playsInline
              style={{
                borderRadius: "16px",
                width: "auto",
                minWidth: "640px",
                height: isFullScreen ? "calc(100vh - 220px)" : "100%",
                objectFit: "contain",
              }}
            />
            <VideoToolbar />
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default PhoneCallVideo;
