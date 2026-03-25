import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Dialog, Text } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";

import { ButtonDeleteUi } from "../../../ui";
import { useWazo } from "../../../services/WazoProvider";

const UserWebhookDelete = ({ open, onClose }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { webhookUser, webhookUserDelete, webhooksUserGet } = useWazo();

  // errors
  const [errors, setErrors] = useState(null);

  // values
  const [webhook, setWebhook] = useState({
    name: "",
    service: "http",
    events: [],
    config: {
      method: "post",
      content_type: "application/json",
      verify_certificate: "false",
      body: "",
      url: "https://",
    },
  });

  // load
  useEffect(() => {
    setWebhook(webhookUser);
  }, [webhookUser]);

  // submit
  const submit = async () => {
    setErrors(null);
    const res = await webhookUserDelete(webhook);
    if (res.error) {
      setErrors(t("common.error"));
    } else {
      await webhooksUserGet();
      onClose();
      toaster.create({
        title: t("webhooks.success"),
        description: t("webhooks.deleted"),
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
            <Dialog.Title>{t("webhooks.title_delete")}</Dialog.Title>
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
            <Text>{t("webhooks.subtitle_delete")} :</Text>
            <Text>
              {t("webhooks.name")} : {webhook.name}
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

export default UserWebhookDelete;
