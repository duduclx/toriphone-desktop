import { IconButton, Popover } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";
import UserLinks from "./UserLinks";
import UserInfos from "./UserInfos";

const UserMenu = () => {
  // api
  const { appCurrentPage, setAppCurrentPage, setMeetingRoute } = useWazo();

  return (
    <Popover.Root positioning={{ placement: "right" }}>
      <Popover.Trigger asChild>
        <IconButton
          variant={appCurrentPage === "user" ? "outline" : "ghost"}
          colorPalette={appCurrentPage === "user" ? "blue" : ""}
          onClick={() => {
            setAppCurrentPage("user");
            window.history.pushState({}, "", "/");
            setMeetingRoute(false);
          }}
        >
          <FaUser />
        </IconButton>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content bg="bgDefault">
          <Popover.Body>
            <UserInfos />
            <UserLinks />
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default UserMenu;
