import { Icon, Flex, Menu, IconButton } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useAuth } from "toriphone-auth";
import { useWazo } from "../../services/WazoProvider";

const UserStatus = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { userState, userStateUpdate } = useWazo();
  const { user } = useAuth();

  return (
    <Menu.Root positioning={{ placement: "right" }}>
      <Menu.Trigger asChild>
        <IconButton variant="ghost" colorPalette={userState == "available" ? "secondary" : userState == "away" ? "warning" : userState == "unavailable" ? "danger" : "info"}>
          <FaCircle />
        </IconButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content bg="bgSecondary" minWidth="200px">
          <Menu.Item 
          bg="bgSecondary"
          onClick={() => userStateUpdate(user.uuid, "available")} >
            <Flex align="center">
              <Icon as={FaCircle} color="var(--chakra-colors-available)" mr="10px" boxSize="6" />
              {t("status.available")}
            </Flex>
          </Menu.Item>
          <Menu.Item 
          bg="bgSecondary"
          onClick={() => userStateUpdate(user.uuid, "away")}>
            <Flex align="center">
              <Icon as={FaCircle} color="var(--chakra-colors-away)" mr="10px" boxSize="6" />
              {t("status.busy")}
            </Flex>
          </Menu.Item>
          <Menu.Item 
          bg="bgSecondary"
          onClick={() => userStateUpdate(user.uuid, "unavailable")} >
            <Flex align="center">
              <Icon as={FaCircle} color="var(--chakra-colors-unavailable)" mr="10px" boxSize="6" />
              {t("status.unavailable")}
            </Flex>
          </Menu.Item>
          <Menu.Item 
          bg="bgSecondary"
          onClick={() => userStateUpdate(user.uuid, "invisible")} >
            <Flex align="center">
              <Icon as={FaCircle} color="var(--chakra-colors-invisible)" mr="10px" boxSize="6" />
              {t("status.invisible")}
            </Flex>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default UserStatus;
