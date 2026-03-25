import { Flex, Box } from "@chakra-ui/react";
import ParticipantCard from "./ParticipantCard";

const VideoSidebar = ({ participants, activeSpeakerId }) => {
  // filters
  const main = participants.find((p) => p.screensharing || p.callId === activeSpeakerId) || participants[0];
  const others = participants.filter((p) => p.callId !== main?.callId);

  return (
    <Flex flex="1" gap="2" p="2" height="100%">
      {/* vidéo principale */}
      <Box flex="1" height="100%">
        {main && <ParticipantCard participant={main} />}
      </Box>

      {/* sidebar vidéos */}
      <Flex width="260px" direction="column" gap="2" overflowY="auto" height="100%" className="hide-scrollbar">
        {others.map((p) => (
          <Box key={p.callId} height="calc((100% - 48px) / 4)" minHeight="230px">
            <ParticipantCard participant={p} />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default VideoSidebar;
