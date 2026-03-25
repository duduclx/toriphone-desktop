import { Box, IconButton, Popover } from "@chakra-ui/react";
import { FaHistory } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";
import CallLogFilter from "./CallLogFilter";

const CallLogMenu = ({ callLogBadge, callLogBadgeReset }) => {
  // api
  const { appCurrentPage, setAppCurrentPage, setMeetingRoute } = useWazo();

  return (
    <Popover.Root positioning={{ placement: "right" }}>
      <Popover.Trigger asChild>
        <Box position="relative">
          <Box position="absolute" top="6px" right="-4px">
            {callLogBadge >= 1 ? <BadgeNotification>{callLogBadge}</BadgeNotification> : null}
          </Box>
          <IconButton
            variant={appCurrentPage === "callLog" ? "outline" : "ghost"}
            colorPalette={appCurrentPage === "callLog" ? "blue" : ""}
            onClick={() => {
              setAppCurrentPage("callLog");
              callLogBadgeReset();
              window.history.pushState({}, "", "/");
              setMeetingRoute(false);
            }}
          >
            <FaHistory />
          </IconButton>
        </Box>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content bg="bgDefault">
          <Popover.Body>
            <CallLogFilter />
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default CallLogMenu;
