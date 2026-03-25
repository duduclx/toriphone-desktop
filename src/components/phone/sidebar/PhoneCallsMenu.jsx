import { IconButton, Popover } from "@chakra-ui/react";
import { FaPhoneVolume } from "react-icons/fa6";

import { useWazo } from "../../../services/WazoProvider";
import PhoneSidebarCalls from "./PhoneSidebarCalls";

const PhoneCallsMenu = () => {
  // api
  const { setAppCurrentPage } = useWazo();

  return (
    <Popover.Root positioning={{ placement: "right" }}>
      <Popover.Trigger asChild>
        <IconButton
          variant="ghost"
          colorPalette="primary"
          onClick={() => {
            setAppCurrentPage("phone");
          }}
        >
          <FaPhoneVolume />
        </IconButton>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content bg="bgDefault" mt="8">
          <Popover.Body>
            <PhoneSidebarCalls />
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default PhoneCallsMenu;
