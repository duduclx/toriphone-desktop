import TwilioContent from "./content/TwilioContent";
import TwilioSidebar from "./sidebar/TwilioSidebar";

import { Flex } from "@chakra-ui/react";
import { useWazo } from "../../../../services/WazoProvider";
import ToggleSidebar from "../../../sidebar/ToggleSidebar";

const Twilio = () => {
  const { showSidebar } = useWazo();

  return (
    <>
      <Flex justifyContent="flex-start" width={showSidebar ? "384px" : "0px"} transition="width 0.5s ease-in-out">
        <TwilioSidebar />
        <Flex justifyContent="center" alignItems="center" width={0}>
          <ToggleSidebar />
        </Flex>
      </Flex>
      <TwilioContent />
    </>
  );
};

export default Twilio;
