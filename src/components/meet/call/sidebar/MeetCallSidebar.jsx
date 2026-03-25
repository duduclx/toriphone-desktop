import { Flex } from "@chakra-ui/react";

import MeetParticipants from "./MeetParticipants";
import MeetChat from "./MeetChat";
import { useWazo } from "../../../../services/WazoProvider";

const MeetCallSidebar = () => {

  // api
  const { meetingSidebarContent } = useWazo();

  if (meetingSidebarContent == "none") return null;
  return (
    <Flex
      width="380px" // largeur fixe pour le sidebar
      bg="bgSecondary"
      boxShadow="lg"
      flexDirection="column"
      alignItems="flex-start"
      p="4"
      overflowY="auto"
      borderLeft="1px solid"
      borderColor="blackAlpha.200"
    >
      {/* Exemple de contenu du sidebar */}
      {meetingSidebarContent === "participants" && <MeetParticipants />}
      {meetingSidebarContent === "chat" && <MeetChat />}
    </Flex>
  );
};

export default MeetCallSidebar;
