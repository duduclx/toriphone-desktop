import {
  MdPhoneInTalk,
  MdPhoneLocked,
  MdPhoneDisabled,
  MdPhonePaused,
  MdPhone,
  MdVideocam,
  MdPhoneAndroid,
} from "react-icons/md";
import { Box, IconButton } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";

const UserStateBadge = ({ userinfo, asNotif = true }) => {
  // states
  const { lineState = "unavailable", doNotDisturb = false, state = "invisible" } = userinfo || {};
  // default values
  let IconComponent = MdPhone;
  let color = useColorModeValue("black", "white");

  if (lineState === "unavailable") {
    IconComponent = MdPhoneDisabled;
    color = useColorModeValue("black", "white");
  } else if (lineState === "ringing" || lineState === "progressing") {
    IconComponent = MdPhoneInTalk;
    color = useColorModeValue("yellow.500", "yellow.200");
  } else if (lineState === "talking") {
    IconComponent = MdPhoneInTalk;
    color = useColorModeValue("orange.500", "orange.200");
  } else if (lineState === "holding") {
    IconComponent = MdPhonePaused;
    color = useColorModeValue("yellow.500", "yellow.200");
  } else if (lineState === "available") {
    if (doNotDisturb) {
      IconComponent = MdPhoneLocked;
      color = useColorModeValue("red.500", "red.200");
    } else {
      switch (state) {
        case "unavailable":
          IconComponent = MdPhone;
          color = useColorModeValue("red.500", "red.200");
          break;
        case "available":
          IconComponent = MdPhone;
          color = useColorModeValue("green.500", "green.200");
          break;
        case "away":
          IconComponent = MdPhone;
          color = useColorModeValue("yellow.500", "yellow.200");
          break;
        case "invisible":
          IconComponent = MdPhoneDisabled;
          color = useColorModeValue("black", "white");
          break;
        default:
          IconComponent = MdPhone;
          color = useColorModeValue("black", "white");
          break;
      }
    }
  }

  return asNotif ? (
    <Box position="absolute">
      <IconButton
        rounded="100%"
        variant="ghost"
        size="2xs"
        color={color}
        cursor="default"
        top="-14px"
        left="-14px"
        bg={useColorModeValue("light.200", "dark.200")}
        position="relative"
      >
        <IconComponent />
      </IconButton>
    </Box>
  ) : (
    <IconButton
      rounded="100%"
      variant="ghost"
      size="lg"
      color={color}
      cursor="default"
      bg={useColorModeValue("light.200", "dark.200")}
    >
      <IconComponent />
    </IconButton>
  );
};

export default UserStateBadge;
