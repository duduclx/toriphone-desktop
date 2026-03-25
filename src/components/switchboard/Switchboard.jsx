import { Flex } from "@chakra-ui/react";

import SwitchboardSidebar from "./sidebar/SwitchboardSidebar";
import SwitchboardContent from "./content/SwitchboardContent";
import ToggleSidebar from "../sidebar/ToggleSidebar";

import { useWazo } from "../../services/WazoProvider";

const Switchboard = () => {
  // api
  const { appLarge, showSidebar } = useWazo();

  return (
    <>
    {appLarge && (
      <Flex justifyContent="flex-start" width={showSidebar ? "384px" : "0px"} transition="width 0.5s ease-in-out">
        <SwitchboardSidebar />
        <Flex justifyContent="center" alignItems="center" width="0">
          <ToggleSidebar />
        </Flex>
      </Flex>
    )}
      <SwitchboardContent />
    </>
  );
};

export default Switchboard;
