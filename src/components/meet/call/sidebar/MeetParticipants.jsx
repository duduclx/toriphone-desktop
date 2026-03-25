import { Box, IconButton, Flex, Text } from "@chakra-ui/react";
import { FaBan, FaVideoSlash, FaVideo, FaVolumeUp } from "react-icons/fa";
import { MdScreenShare, MdPause, MdMicOff, MdMic } from "react-icons/md";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";
import MeetAuthorizations from "./MeetAuthorizations";

const MeetParticipants = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { meetingRoom, meetingParticipantKick } = useWazo();
  const { user } = useAuth();

  const kick = (p) => {
    if (user.uuid !== p.uuid) {
      meetingParticipantKick(meetingRoom, p);
    }
  };

  return (
    <Box width="100%">
      <MeetAuthorizations />
      <Box my="4">
        <Text p="2" fontSize="2xl" fontWeight="bold" textAlign="center">
          {t("meetings.participants_title")}
        </Text>
      </Box>
      <Flex
        flexDirection="column"
        width="100%"
        overflowY="auto"
        height="auto"
        className="hide-scrollbar"
      >
        {meetingRoom.participants.map((p, index) => (
          <Flex
            key={index}
            mb="3"
            bg="bgElevated"
            p="4"
            borderRadius="16px"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            boxShadow={p.isTalking ? "0 0 10px #38B2AC" : "none"} // halo vert si talking
          >
            {/* Info participant */}
            <Flex flexDirection="column">
              <Text fontWeight="bold">{p.name}</Text>
            </Flex>

            {/* Icons */}
            <Flex gap="3" alignItems="center">
              {/* Talking */}
              {p.isTalking && (
                <Box color="teal.400">
                  <FaVolumeUp />
                </Box>
              )}

              {/* Screen sharing */}
              {p.screensharing && (
                <Box color="yellow.400">
                  <MdScreenShare />
                </Box>
              )}

              {/* Hold */}
              {p.isOnHold && (
                <Box color="orange.400">
                  <MdPause />
                </Box>
              )}

              {/* Mic */}
              {p.audioMuted ? (
                <Box color="red.400">
                  <MdMicOff />
                </Box>
              ) : (
                <Box color="green.400">
                  <MdMic />
                </Box>
              )}

              {/* Camera */}
              {p.videoMuted ? (
                <Box color="red.400">
                  <FaVideoSlash />
                </Box>
              ) : (
                <Box color="green.400">
                  <FaVideo />
                </Box>
              )}
              {/* Kick*/}
              <IconButton
                variant="ghost"
                colorPalette={p.uuid !== user.uuid ? "danger" : "secondary"}
                onClick={() => kick(p)}
              >
                <FaBan />
              </IconButton>
            </Flex>
          </Flex>
        ))}
      </Flex>
      
    </Box>
  );
};

export default MeetParticipants;
