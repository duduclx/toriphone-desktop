import { useEffect, useState, useCallback } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { useWazo } from "../../../services/WazoProvider";
import SwitchboardToolbar from "./SwitchboardToolbar";

const SwitchboardAnswered = () => {
  // api
  const { callSession } = useWazo();

  // values
  const [formattedTime, setFormattedTime] = useState("00:00");

  const updateTimer = useCallback(() => {
    const now = new Date();
    const elapsedTime = now - callSession.startTime;
    const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    setFormattedTime(
      `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    );
  }, [callSession.startTime]);

  useEffect(() => {
    const timerInterval = setInterval(updateTimer, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, [callSession.cameraEnabled, updateTimer]);

  return (
    <Flex flexDirection="row" flex="1" flexWrap="wrap" overflowY="hidden">
      {Object.keys(callSession).length > 0 && (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
          flex="1"
          flexWrap="wrap"
          overflowY="hidden"
          gap="4"
        >
          <Text textAlign="center" fontSize="3xl" fontWeight="bold">
            {callSession.realDisplayName ||
              callSession.displayName ||
              callSession.number}
          </Text>
          <Text textAlign="center">{formattedTime}</Text>
          <SwitchboardToolbar />
        </Flex>
      )}
    </Flex>
  );
};

export default SwitchboardAnswered;
