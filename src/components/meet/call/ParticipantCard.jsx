import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ParticipantVideo from "./ParticipantVideo";

const ParticipantCard = ({ participant }) => {

  const isTalking = participant.isTalking && !participant.audioMuted;

  return (
    <Box
      position="relative"
      borderRadius="22px"
      overflow="hidden"
      bg="black"
      cursor="pointer"
      border={isTalking ? "3px solid #38B2AC" : "none"}
      width="100%"
      height="100%"
    >
      <ParticipantVideo participant={participant} />
      <Text
        position="absolute"
        bottom="0"
        left="0"
        p="2"
        bg="rgba(0,0,0,0.6)"
        color="white"
        fontSize="14px"
      >
        {participant.name}
      </Text>
    </Box>
  );
};

export default React.memo(ParticipantCard);