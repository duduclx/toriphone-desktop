import { useEffect, useState } from "react";
import { toaster } from "../../ui/toaster";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

import UserWebhookForm from "./UserWebhookForm";

const UserWebhookEdit = ({ open, onClose }) => {
  // requirement
  const { t } = useTranslation();

  // api
  const { webhookUser, webhooksUserGet, webhookUserEdit } = useWazo();

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
    const res = await webhookUserEdit(webhook);
    if (res.error) {
      setErrors(t("common.error"));
    } else {
      await webhooksUserGet();
      onClose();
      setWebhook({
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
      toaster.create({
        title: t("webhooks.success"),
        description: t("webhooks.edited"),
        type: "success",
        duration: 3000,
        closable: true,
      });
    }
  };

  return (
    <UserWebhookForm
      open={open}
      onClose={onClose}
      webhook={webhook}
      setWebhook={setWebhook}
      submit={submit}
      errors={errors}
      edit
    />
  );
};

export default UserWebhookEdit;
