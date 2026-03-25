import { useEffect, useState } from "react";
import { toaster } from "../../ui/toaster";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

import UserExternalForm from "./UserExternalForm";

const UserExternalEdit = ({ open, onClose }) => {
  // requirement
  const { t } = useTranslation();
  
  // api
  const { externalAppUser, externalAppUserUpdate, externalAppsUserGet } = useWazo();

  // errors
  const [errors, setErrors] = useState(null);

  // values
  const [externalApp, setExternalApp] = useState({ label: "", configuration: {} });

  // load
  useEffect(() => {
    setExternalApp({ label: externalAppUser.label, name: externalAppUser.name, configuration: externalAppUser.configuration });
  }, [externalAppUser]);

  // submit
  const submit = async () => {
    setErrors(null);
    const res = await externalAppUserUpdate(externalApp);
    if (res.error) {
      setErrors(t("common.error"));
    } else {
      setExternalApp({ label: "", configuration: {} });
      await externalAppsUserGet();
      onClose();
      toaster.create({
          title: t("externals.success"),
          description: t("externals.edited"),
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
      edit
    />
  );
}

export default UserExternalEdit
