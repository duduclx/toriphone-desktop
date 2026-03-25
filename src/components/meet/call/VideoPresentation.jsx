import { Flex, Box } from "@chakra-ui/react";
import ParticipantCard from "./ParticipantCard";

const VideoPresentation = ({ participants, activeSpeakerId }) => {
  // filters
  const main = participants.find((p) => p.screensharing) || activeSpeakerId;

  return (
    <Flex flex="1" p="2" height="100%">
      {/* vidéo principale */}
      <Box flex="1" height="100%">
        {main && <ParticipantCard participant={main} />}
      </Box>
    </Flex>
  );
};

export default VideoPresentation;
