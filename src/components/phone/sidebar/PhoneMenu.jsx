import { Box, IconButton, Popover } from "@chakra-ui/react";
import { FaPhone } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";

import PhoneSidebarDialer from "./PhoneSidebarDialer";
import PhoneSidebarFavs from "./PhoneSidebarFavs";
import PhoneSidebarCallerId from "./PhoneSidebarCallerId";

const PhoneMenu = () => {
  // api
  const { appCurrentPage, setAppCurrentPage, setMeetingRoute } = useWazo();

  return (
    <Popover.Root positioning={{ placement: "right" }}>
      <Popover.Trigger asChild>
        <IconButton
          variant={appCurrentPage === "phone" ? "outline" : "ghost"}
          colorPalette={appCurrentPage === "phone" ? "primary" : ""}
          onClick={() => {
            setAppCurrentPage("phone");
            window.history.pushState({}, "", "/");
            setMeetingRoute(false);
          }}
        >
          <FaPhone />
        </IconButton>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content bg="bgDefault" mt="8">
          <Popover.Body>
            <Box maxHeight="calc(100vh - 40px)" overflowY="auto" display="flex" flexDirection="column">
              <PhoneSidebarCallerId />
              <PhoneSidebarDialer />
              <PhoneSidebarFavs />
            </Box>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default PhoneMenu;
