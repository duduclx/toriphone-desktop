import { useState } from "react";
import { Box, IconButton, InputGroup, Text } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";
import { InputUi } from "../../../ui";
import { useColorModeValue } from "../../ui/color-mode";
import { FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const UserStatus = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { user } = useAuth();
  const { userStatusUpdate } = useWazo();

  // states
  const [userStatus, setUserStatus] = useState("");

  // update status
  const changeStatus = async () => {
    const promise = await userStatusUpdate(userStatus);
    toaster.create(promise);
  };
  const onKeyDownStatus = (event) => {
    if (event.key === "Enter") {
      changeStatus();
    }
  };

  return (
    <Box my="8">
      <Text pb="2">{t("profil.my_status")}</Text>
      <InputGroup
        endElement={
          <IconButton variant="ghost" size="md" fontSize="lg" onClick={() => changeStatus()}>
            <FaCheck />
          </IconButton>
        }
      >
        <InputUi
          variant="filled"
          placeholder={user.profile.status}
          _placeholder={{ color: useColorModeValue("black", "white") }}
          onChange={(e) => setUserStatus(e.target.value)}
          onKeyDown={(e) => onKeyDownStatus(e)}
        />
      </InputGroup>
    </Box>
  );
};

export default UserStatus;
