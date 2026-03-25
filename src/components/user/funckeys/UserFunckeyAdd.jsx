import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toaster } from "../../ui/toaster";

import { useWazo } from "../../../services/WazoProvider";

import UserfunckeyForm from "./UserfunckeyForm";

const UserFunckeyAdd = ({ open, onClose }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { funckeyUpdate, funckeys, funckeysGet } = useWazo();

  // value
  const position = Object.entries(funckeys.keys).length + 1;
  const [funckeyPosition, setFunckeyPosition] = useState(position);
  const [funckey, setFunckey] = useState({
    blf: false,
    label: "",
    destination: {}
   });
  const [errors, setErrors] = useState(null);

  // submit
  const submit = async () => {
    setErrors(null);
    // add / update key
    if (!funckeyPosition) {
      setErrors(t("funckeys.position_error"));
    }
    const res = await funckeyUpdate(funckeyPosition, funckey);

    if (res.error) {
      setErrors(res.error[0]);
    } else {
      // reload funckeys
      setFunckey({ destination: {} });
      await funckeysGet();
      onClose();
      toaster.create({
        title: t("funckeys.success"),
        description: t("funckeys.created"),
        type: "success",
        duration: 3000,
        closable: true,
      });
    }
  };

  return (
    <UserfunckeyForm
      open={open}
      onClose={onClose}
      funckeyPosition={funckeyPosition}
      setFunckeyPosition={setFunckeyPosition}
      funckey={funckey}
      setFunckey={setFunckey}
      submit={submit}
      errors={errors}
    />
  );
};

export default UserFunckeyAdd;
