import { useState } from "react";
import { Flex } from "@chakra-ui/react";

import { useWazo } from "../../../services/WazoProvider";
import { useMeetingState } from "./MeetingState";

import MeetCallHeader from "./header/MeetCallHeader";
import MeetCallSidebar from "./sidebar/MeetCallSidebar";
import VideoLayout from "./VideoLayout";

const MeetCall = () => {
  // api
  const { meetingRoom } = useWazo();
  
  // fixes
  const meetingState = useMeetingState(meetingRoom);

  return (
    meetingRoom.callId && (
      <Flex
        direction="column"
        flex="1"
        justifyContent="flex-start"
        alignItems="center"
        width="100%"
        h="100vh"
        bg="bgDefault"
      >
        {/* HEADER */}
        <MeetCallHeader />
        <Flex flex="1" width="100%" height="100%" overflow="hidden">
          <VideoLayout />
          <MeetCallSidebar />
        </Flex>
      </Flex>
    )
  );
};

export default MeetCall;
