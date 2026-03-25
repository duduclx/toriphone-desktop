import { Box, IconButton, Popover } from "@chakra-ui/react";
import { FaVoicemail } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";
import BadgeNotification from "../../../utils/BadgeNotification";
import VoicemailsLinks from "./VoicemailsLinks";

const VoicemailsMenu = ({ voicemailsUnread }) => {
  // api
  const { appCurrentPage, setAppCurrentPage, setMeetingRoute } = useWazo();

  return (
    <Popover.Root positioning={{ placement: "right" }}>
      <Popover.Trigger asChild>
        <Box position="relative">
          <Box position="absolute" top="6px" right="-4px">
            {voicemailsUnread >= 1 ? <BadgeNotification>{voicemailsUnread}</BadgeNotification> : null}
          </Box>
          <IconButton
            variant={appCurrentPage === "voicemails" ? "outline" : "ghost"}
            colorPalette={appCurrentPage === "voicemails" ? "blue" : ""}
            onClick={() => {
              setAppCurrentPage("voicemails");
              window.history.pushState({}, "", "/");
              setMeetingRoute(false);
            }}
          >
            <FaVoicemail />
          </IconButton>
        </Box>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content bg="bgDefault">
          <Popover.Body>
            <VoicemailsLinks />
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default VoicemailsMenu;
