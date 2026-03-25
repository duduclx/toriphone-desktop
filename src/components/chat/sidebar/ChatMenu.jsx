import { Box, IconButton, Popover } from "@chakra-ui/react";
import { FaCommentAlt } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";
import BadgeNotification from "../../../utils/BadgeNotification";
import ChatSidebar from "./ChatSidebar";

const ChatMenu = ({ TotalUnread }) => {
  // api
  const { appCurrentPage, setAppCurrentPage, setMeetingRoute } = useWazo();

  return (
    <Popover.Root positioning={{ placement: "right" }}>
      <Popover.Trigger asChild>
        <Box position="relative">
          <Box position="absolute" top="6px" right="-4px">
            {TotalUnread >= 1 ? <BadgeNotification>{TotalUnread}</BadgeNotification> : null}
          </Box>
          <IconButton
            variant={appCurrentPage === "chat" ? "outline" : "ghost"}
            colorPalette={appCurrentPage === "chat" ? "blue" : ""}
            onClick={() => {
              setAppCurrentPage("chat");
              window.history.pushState({}, "", "/");
              setMeetingRoute(false);
            }}
          >
            <FaCommentAlt />
          </IconButton>
        </Box>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content bg="bgDefault">
          <Popover.Body>
            <ChatSidebar />
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default ChatMenu;
