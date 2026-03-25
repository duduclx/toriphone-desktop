import { Icon, IconButton, Menu } from "@chakra-ui/react";
import { FaPhone, FaPhoneSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useAuth } from "toriphone-auth";
import { useWazo } from "../../services/WazoProvider";

const UserDND = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { user } = useAuth();
  const { doNotDisturbToggle } = useWazo();

  const onSave = (checked) => {
    doNotDisturbToggle(user, checked);
  };

  return (
    <Menu.Root positioning={{ placement: "right" }}>
      <Menu.Trigger asChild>
        <IconButton
        variant="ghost"
        colorPalette={user.profile.doNotDisturb ? "danger" : "secondary"}
        >
          {user.profile.doNotDisturb ? <FaPhoneSlash /> : <FaPhone />}
        </IconButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content bg="bgSecondary">
          <Menu.Item bg="bgSecondary" onClick={() => onSave(!user.profile.doNotDisturb)} pl="4">
            {t("dnd")}
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default UserDND;
