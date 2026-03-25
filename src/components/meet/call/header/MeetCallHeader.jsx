import { Flex, Text } from "@chakra-ui/react";

import { useWazo } from "../../../../services/WazoProvider";

import MeetInfos from "./MeetInfos";
import MeetActions from "./MeetActions";
import MeetViewMode from "./MeetViewMode";
import MeetSettings from "./MeetSettings";
import MeetSidebar from "./MeetSidebar";

const MeetCallHeader = () => {

  // api
  const { meetingRoom } = useWazo();

  return (
    <Flex width="100%" justifyContent="space-between" alignItems="center" p="4" bg="bgElevated">
      <Flex justifyContent="flex-end" alignItems="center">
        <MeetInfos />
        <Text p="2" as="b" fontSize="3xl" textAlign="right">
          {meetingRoom.name || ""}
        </Text>
      </Flex>
      <Flex justifyContent="flex-end" gap="4" alignItems="center">
        <MeetActions />
      </Flex>
      <Flex justifyContent="flex-end" gap="4" alignItems="center">
        {/*
        <MeetSettings />
        */}
        <MeetViewMode />
        <MeetSidebar />
      </Flex>
    </Flex>
  );
};

export default MeetCallHeader;
