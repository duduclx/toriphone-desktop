import { useState } from "react";
import { Alert, Dialog, Text } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";
import { ButtonDeleteUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

const UserfunckeyDelete = ({ open, onClose, position }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { funckey, funckeyDelete, funckeysGet } = useWazo();

  // values
  const [errors, setErrors] = useState(null);

  // submit
  const submit = async () => {
    setErrors(null);
    // delete
    const res = await funckeyDelete(position);
    if (res.error) {
      setErrors(t("common.error"));
    } else {
      await funckeysGet();
      onClose();
      toaster.create({
        title: t("funckeys.success"),
        description: t("funckeys.deleted"),
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
            <Dialog.Title>{t("funckeys.title_delete")}</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            {errors && (
              <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>{t("funckeys.error")}</Alert.Title>
                <Alert.Description>{errors}</Alert.Description>
              </Alert.Root>
            )}
            <Text>{t("funckeys.subtitle_delete")} :</Text>
            <Text>
              {t("funckeys.position")} : {position}
            </Text>
            <Text>
              {t("funckeys.label")} : {funckey.label}
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

export default UserfunckeyDelete;
