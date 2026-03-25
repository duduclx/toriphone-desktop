import ChatSidebar from "./sidebar/ChatSidebar";
import ChatContent from "./content/ChatContent";

import { Flex } from "@chakra-ui/react";
import { useWazo } from "../../services/WazoProvider";
import ToggleSidebar from "../sidebar/ToggleSidebar";

const Chat = () => {
  // api
  const { appLarge, showSidebar } = useWazo();

  return (
    <>
    {appLarge && (
      <Flex justifyContent="flex-start" width={showSidebar ? "384px" : "0px"} transition="width 0.5s ease-in-out">
        <ChatSidebar />
        <Flex justifyContent="center" alignItems="center" width="0">
          <ToggleSidebar />
        </Flex>
      </Flex>
    )}
      <ChatContent />
    </>
  );
};

export default Chat;
