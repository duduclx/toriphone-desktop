import { Box, IconButton, Popover } from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";
import Conferences from "./Conferences";
import MeetCalendar from "./MeetCalendar";

const MeetMenu = () => {
  // api
  const { appCurrentPage, setAppCurrentPage, setMeetingRoute } = useWazo();

  return (
    <Popover.Root positioning={{ placement: "right" }}>
      <Popover.Trigger asChild>
        <Box position="relative">
          <IconButton
            variant={appCurrentPage === "meet" ? "outline" : "ghost"}
            colorPalette={appCurrentPage === "meet" ? "blue" : ""}
            onClick={() => {
              setAppCurrentPage("meet");
              window.history.pushState({}, "", "/");
              setMeetingRoute(false);
            }}
          >
            <FaUsers />
          </IconButton>
        </Box>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content bg="bgDefault">
          <Popover.Body>
            <Conferences />
            <MeetCalendar />
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}

export default MeetMenu
