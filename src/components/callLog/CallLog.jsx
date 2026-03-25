import { Flex } from "@chakra-ui/react";

import CallLogSidebar from "./sidebar/CallLogSidebar";
import CallLogContent from "./content/CallLogContent";

import { useWazo } from "../../services/WazoProvider";
import ToggleSidebar from "../sidebar/ToggleSidebar";

const CallLog = () => {
  // api
  const { appLarge, showSidebar } = useWazo();

  return (
    <>
    {appLarge && (
      <Flex justifyContent="flex-start" width={showSidebar ? "384px" : "0px"} transition="width 0.5s ease-in-out">
        <CallLogSidebar />
        <Flex justifyContent="center" alignItems="center" width={0}>
          <ToggleSidebar />
        </Flex>
      </Flex>
    )}
      <CallLogContent />
    </>
  );
};

export default CallLog;
