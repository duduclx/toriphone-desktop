import { IconButton, Popover } from "@chakra-ui/react";
import { FaTv } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";
import SwitchboardCalls from "./SwitchboardCalls";

const SwitchboardMenu = () => {
  // api
  const { appCurrentPage, setAppCurrentPage, setMeetingRoute } = useWazo();

  return (
    <Popover.Root positioning={{ placement: "right" }}>
      <Popover.Trigger asChild>
        <IconButton
          variant={appCurrentPage === "switchboard" ? "outline" : "ghost"}
          colorPalette={appCurrentPage === "switchboard" ? "blue" : ""}
          onClick={() => {
            setAppCurrentPage("switchboard");
            window.history.pushState({}, "", "/");
            setMeetingRoute(false);
          }}
        >
          <FaTv />
        </IconButton>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content bg="bgDefault">
          <Popover.Body>
            <SwitchboardCalls />
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default SwitchboardMenu;
