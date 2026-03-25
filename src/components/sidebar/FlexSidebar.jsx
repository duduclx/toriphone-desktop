import { Flex } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { useWazo } from "../../services/WazoProvider";

const FlexSidebar = ({ children }) => {
  // api
  const { showSidebar } = useWazo();

  return (
    <Flex
      flexDirection="column"
      boxShadow="lg"
      height="100vh"
      p="4"
      width="100%"
      justifyContent="flex-start"
      bg="bgSecondary"
      overflowY="auto"
      className="hide-scrollbar"
      opacity={showSidebar ? 1 : 0}
      transition="visibility 0.4s, opacity 0.4s ease-in-out"
      transitionDelay={!showSidebar ? "0s" : "0.5s"}
    >
      {children}
    </Flex>
  );
};

export default FlexSidebar;
