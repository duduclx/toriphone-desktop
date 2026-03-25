import { useState } from "react";
import { toaster } from "../../ui/toaster";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

import UserExternalForm from "./UserExternalForm";

const UserExternalAdd = ({ open, onClose }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { externalAppUserCreate, externalAppsUserGet } = useWazo();

  // errors
  const [errors, setErrors] = useState(null);

  // values
  const [externalApp, setExternalApp] = useState({ label: "", configuration: {} });

  // submit
  const submit = async () => {
    setErrors(null);
    const res = await externalAppUserCreate(externalApp);
    if (res.error) {
      setErrors(t("common.error"));
    } else {
      setExternalApp({ label: "", configuration: {} });
      await externalAppsUserGet();
      onClose();
      toaster.create({
          title: t("externals.success"),
          description: t("externals.created"),
          type: 'success',
          duration: 3000,
          closable: true,
        });
    }
  };

  return (
    <UserExternalForm
      open={open}
      onClose={onClose}
      externalApp={externalApp}
      setExternalApp={setExternalApp}
      submit={submit}
      errors={errors}
    />
  );
}

export default UserExternalAdd
