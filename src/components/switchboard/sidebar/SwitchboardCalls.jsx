import { Box, Text, Separator, IconButton, Flex, HStack } from "@chakra-ui/react";
import { FaPhoneAlt } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";

const SwitchboardCalls = () => {
  // api
  const { switchboards, switchboardCallAnswer, switchboardCallResume } = useWazo();

  return (
    <>
      {switchboards.map((item, index) => (
        <Box key={index} mt="4" bg="bgdefault" boxShadow="lg">
          <Text p="2" textAlign="center">
            {item.name}
          </Text>
          <Separator />
          <Flex flex="1" flexDirection="column" gap="4">
            {item.queued.length > 0 &&
              item.queued.map((queued, index) => (
                <HStack
                  key={index}
                  justifyContent="space-between"
                  alignItems="center"
                  m="2"
                  p="2"
                  bg="bgElevated"
                  borderRadius="8px"
                >
                  <Box>
                    <Text>{queued.caller_id_number}</Text>
                    <Text>{queued.caller_id_name}</Text>
                  </Box>
                  <Box>
                    <IconButton
                      rounded="100%"
                      colorPalette="secondary"
                      onClick={() => switchboardCallAnswer(item.uuid, queued.id)}
                    >
                      <FaPhoneAlt />
                    </IconButton>
                  </Box>
                </HStack>
              ))}
          </Flex>
          {/*
          <Flex flexDirection="column" gap="4" mt="4">
            <Text>Appels en pause</Text>
            {item.hold.length > 0 &&
              item.hold.map((hold, index) => (
                <HStack
                  key={index}
                  justifyContent="space-between"
                  alignItems="center"
                  p="2"
                  bg="bgElevated"
                  borderRadius="8px"
                >
                  <Box>
                    <Text>{hold.caller_id_number}</Text>
                    <Text>{hold.caller_id_name}</Text>
                  </Box>
                  <Box>
                    <IconButton
                      rounded="100%"
                      colorPalette="primary"
                      onClick={() => switchboardCallResume(item.uuid, hold.id)}
                    >
                      <FaPhoneAlt />
                    </IconButton>
                  </Box>
                </HStack>
              ))}
          </Flex>
           */}
        </Box>
      ))}
    </>
  );
};

export default SwitchboardCalls;
