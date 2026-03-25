import { Box, IconButton, Popover } from "@chakra-ui/react";
import { FaAddressCard } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";
import ContactsLinks from "./ContactsLinks";

const ContactsMenu = () => {
  // api
  const { appCurrentPage, setAppCurrentPage, setMeetingRoute } = useWazo();

  return (
    <Popover.Root positioning={{ placement: "right" }}>
      <Popover.Trigger asChild>
        <Box position="relative">
          <IconButton
            variant={appCurrentPage === "contacts" ? "outline" : "ghost"}
            colorPalette={appCurrentPage === "contacts" ? "blue" : ""}
            onClick={() => {
              setAppCurrentPage("contacts");
              window.history.pushState({}, "", "/");
              setMeetingRoute(false);
            }}
          >
            <FaAddressCard />
          </IconButton>
        </Box>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content bg="bgDefault">
          <Popover.Body>
            <ContactsLinks />
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default ContactsMenu;
