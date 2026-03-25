import { useState } from "react";
import { Box, Button, Field, Text, Flex, Separator } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";
import { InputUi } from "../../../ui";
import { useColorModeValue } from "../../ui/color-mode";
import { useTranslation } from "react-i18next";
import { useAuth } from "toriphone-auth";

import HeaderSearch from "../../header/search/HeaderSearch";

const UserPassword = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { userPasswordUpdate } = useAuth();

  // states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // update pwd
  const changePassword = async () => {
    if (oldPassword.length > 0 && newPassword.length >= 6) {
      const res = await userPasswordUpdate(oldPassword, newPassword);
      if (res.error) {
        toaster.create({
          type: "error",
          title: t("login.update_password_event"),
          description: t("login.update_password_event_false"),
          duration: 3000,
          closable: true,
        });
      } else {
        toaster.create({
          type: "success",
          title: t("login.update_password_event"),
          description: t("login.update_password_event_true"),
          duration: 3000,
          closable: true,
        });
      }
    } else {
      toaster.create({
        type: "error",
        title: t("profile.change_password_event"),
        description: t("profile.change_password_event_invalid"),
        duration: 5000,
      });
    }
  };

  return (
    <Flex flex="1" flexDirection="column" p="2" height="100vh" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t("user.password")}
        </Text>
        <HeaderSearch />
      </Flex>
      <Separator />
      <Flex
        flex="1"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        overflowY="auto"
        className="hide-scrollbar"
      >
        <Box my="8" width="50%">
          <Text pb="2">{t("profile.change_password")}</Text>
          <Box my="4">
            <Field.Root>
              <InputUi
                placeholder={t("profile.change_password_old_placeholder")}
                _placeholder={{ color: useColorModeValue("black", "white") }}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {/*oldPassword.length < 1 ? (
                <Field.ErrorText>{t("profile.change_password_old_invalid")}</Field.ErrorText>
              ) : (
                <Field.HelperText>{t("profile.change_password_old_valid")}</Field.HelperText>
              )*/}
            </Field.Root>
          </Box>
          <Box my="4">
            <Field.Root invalid={newPassword.length < 6}>
              <InputUi
                placeholder={t("profile.change_password_new_placeholder")}
                _placeholder={{ color: useColorModeValue("black", "white") }}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {newPassword.length < 6 ? (
                <Field.ErrorText>{t("profile.change_password_new_invalid")}</Field.ErrorText>
              ) : (
                <Field.HelperText>{t("profile.change_password_new_valid")}</Field.HelperText>
              )}
            </Field.Root>
            <Box textAlign="right" mt="4">
              <Button colorPalette="blue" onClick={() => changePassword()}>
                {t("profile.change_password_button")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default UserPassword;
