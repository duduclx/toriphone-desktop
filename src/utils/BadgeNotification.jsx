import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode"

const BadgeNotification = ({ children }) => {
  return (
    <Box pos="relative">
      <Box
        bgColor={useColorModeValue("red.400", "red.600")}
        pos="absolute"
        top="-4px"
        right="-4px"
        fontSize="xs"
        cursor='default'
        as="button"
        w="20px"
        h="20px"
        borderRadius="10px"
        height="18px"
      >
        {children}
      </Box>
    </Box>
  );
};

export default BadgeNotification;
