import { useEffect } from "react";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

const Conferences = () => {
  // requirements
  const { t } = useTranslation();
  
  // api
  const { conferences, conferencesGet, meetingConnect } = useWazo();

  useEffect(() => {
    conferencesGet();
  }, []);

  return (
    conferences.items && (
      <Flex flexDirection="column" gap="2">
        <Box py="4" textAlign="center">
          <Text mb="4" as="b">
            Liste des conférences
          </Text>
        </Box>
        {conferences.items.map((conference, index) => (
          <Flex key={index} justifyContent="space-between" alignItems="center" bg="bgElevated" borderRadius="8px" p="2">
            <Text>{conference.name}</Text>
            <IconButton variant="ghost" colorPalette="primary" onClick={() => meetingConnect(conference)}>
              <FaPlay />
            </IconButton>
          </Flex>
        ))}
      </Flex>
    )
  );
};

export default Conferences;
