import Meetsidebar from "./sidebar/Meetsidebar";
import MeetContent from "./content/MeetContent";
import MeetCall from "./call/MeetCall";
import MeetJoin from "../meet/join/MeetJoin";

import { Flex } from "@chakra-ui/react";
import { useWazo } from "../../services/WazoProvider";
import ToggleSidebar from "../sidebar/ToggleSidebar";

const Meet = () => {
  // api
  const { showSidebar, meetingRoom, meetingRoute, setMeetingRoute, appLarge } = useWazo();

  if (meetingRoom) {
    return <MeetCall />;
  }

  if (meetingRoute) {
    return <MeetJoin />;
  }

  return (
    <>
      {appLarge && (
        <Flex justifyContent="flex-start" width={showSidebar ? "384px" : "0px"} transition="width 0.5s ease-in-out">
          <Meetsidebar setMeetingRoute={setMeetingRoute} />
          <Flex justifyContent="center" alignItems="center" width="0">
            <ToggleSidebar />
          </Flex>
        </Flex>
      )}
      <MeetContent />
    </>
  );
};

export default Meet;
