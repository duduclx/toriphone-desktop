import { Flex } from "@chakra-ui/react";
import ToggleSidebar from "../sidebar/ToggleSidebar";
import { useWazo } from "../../services/WazoProvider";

import VoicemailsSidebar from "./sidebar/VoicemailsSidebar";
import VoicemailsContent from "./content/VoicemailsContent";

const Voicemails = () => {
  // api
  const { appLarge, showSidebar } = useWazo();

  return (
    <>
    {appLarge && (
      <Flex justifyContent="flex-start" width={showSidebar ? "384px" : "0px"} transition="width 0.5s ease-in-out">
        <VoicemailsSidebar />
        <Flex justifyContent="center" alignItems="center" width="0">
          <ToggleSidebar />
        </Flex>
      </Flex>
    )}
      <VoicemailsContent />
    </>
  );
};

export default Voicemails;
