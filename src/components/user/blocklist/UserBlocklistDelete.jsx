import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Dialog, Text } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";

import { ButtonDeleteUi } from "../../../ui";
import { useWazo } from "../../../services/WazoProvider";

const UserBlocklistDelete = ({ open, onClose }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { blocklist, blocklistDelete, blocklistsGet } = useWazo();

  // errors
  const [errors, setErrors] = useState(null);

  // values
  const [blocklistNumber, setBlocklistNumber] = useState({ label: "", number: "" });

  // load
  useEffect(() => {
    setBlocklistNumber({ label: blocklist.label, number: blocklist.number, uuid: blocklist.uuid });
  }, [blocklist]);

  // submit
  const submit = async () => {
    setErrors(null);
    const res = await blocklistDelete(blocklistNumber);
    if (res.error) {
      const rawMessage = Array.isArray(res.error) ? res.error[0] : res.error.toString();

      let cleanedMessage = "Une erreur est survenue";

      // Cas 1 : "Resource Error - BlocklistNumber already exists (...)"
      const match1 = rawMessage.match(/- (.*?) \(/);
      if (match1) {
        cleanedMessage = match1[1];
      }

      // Cas 2 : "Input Error - number: ['Invalid E.164 phone number']"
      const match2 = rawMessage.match(/: \['(.+?)']/);
      if (match2) {
        cleanedMessage = match2[1];
      }

      setErrors(cleanedMessage);
    } else {
      await blocklistsGet();
      onClose();
      toaster.create({
        title: t("blocklist.success"),
        description: t("blocklist.deleted"),
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
            <Dialog.Title>{t("blocklist.title_delete")}</Dialog.Title>
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
            <Text>{t("blocklist.subtitle_delete")} :</Text>
            <Text>
              {t("blocklist.name")} : {blocklistNumber.label}
            </Text>
            <Text>
              {t("blocklist.number")} : {blocklistNumber.number}
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

export default UserBlocklistDelete;
