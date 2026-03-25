import { Flex } from "@chakra-ui/react";

import ChatDialerMenu from "./ChatDialerMenu";
import ChatDialerContent from "./ChatDialerContent";
import ChatDialerForm from "./ChatDialerForm";

const ChatDialerPage = () => {
  return (
    <Flex flexDirection="column" justifyContent="flex-start" flex="1" overflow="hidden">
      <ChatDialerMenu />
      <ChatDialerContent />
      <ChatDialerForm />
    </Flex>
  );
};

export default ChatDialerPage;
