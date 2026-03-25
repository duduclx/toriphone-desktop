import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Dialog, Text } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";

import { ButtonDeleteUi } from "../../../ui";
import { useWazo } from "../../../services/WazoProvider";

const UserExternalDelete = ({ open, onClose }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { externalAppUser, externalAppUserDelete, externalAppsUserGet } = useWazo();

  // errors
  const [errors, setErrors] = useState(null);

  // values
  const [externalApp, setExternalApp] = useState({ label: "", configuration: {} });

  // load
  useEffect(() => {
    setExternalApp({
      label: externalAppUser.label,
      name: externalAppUser.name,
      configuration: externalAppUser.configuration,
    });
  }, [externalAppUser]);

  // submit
  const submit = async () => {
    setErrors(null);
    const res = await externalAppUserDelete(externalApp);
    if (res.error) {
      setErrors(t("common.error"));
    } else {
      await externalAppsUserGet();
      onClose();
      toaster.create({
        title: t("externals.success"),
        description: t("externals.deleted"),
        type: "success",
        duration: 3000,
        closable: true,
      });
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="bgDefault">
          <Dialog.Header alignSelf="center">
            <Dialog.Title>{t("externals.title_delete")}</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            {errors && (
              <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>{t("common.error")}</Alert.Title>
                <Alert.Description>{errors}</Alert.Description>
              </Alert.Root>
            )}
            <Text>{t("externals.subtitle_delete")} :</Text>
            <Text>
              {t("externals.name")} : {externalApp.label}
            </Text>
          </Dialog.Body>
          <Dialog.Footer>
            <ButtonDeleteUi onClick={() => submit()} />
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default UserExternalDelete;
