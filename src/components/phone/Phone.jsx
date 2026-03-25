import PhoneSidebar from "./sidebar/PhoneSidebar";
import PhoneCall from "./content/PhoneCall";

import { Flex } from "@chakra-ui/react";
import { useWazo } from "../../services/WazoProvider";
import ToggleSidebar from "../sidebar/ToggleSidebar";

const Phone = () => {
  // api
  const { appLarge, showSidebar } = useWazo();

  return (
    <>
    {appLarge && (
      <Flex justifyContent="flex-start" width={showSidebar ? "384px" : "0px"} transition="width 0.5s ease-in-out">
        <PhoneSidebar />
        <Flex justifyContent="center" alignItems="center" width="0">
          <ToggleSidebar />
        </Flex>
      </Flex>
    )}
      <PhoneCall />
    </>
  );
};

export default Phone;
