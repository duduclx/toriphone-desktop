import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toaster } from "../../ui/toaster";

import { useWazo } from "../../../services/WazoProvider";
import UserfunckeyForm from "./UserfunckeyForm";

const UserFunckeyEdit = ({ open, onClose, position, setPosition }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { funckey, setFunckey, funckeyUpdate, funckeysGet } = useWazo();

  // values
  const [errors, setErrors] = useState(null);

  //submit
  const submit = async () => {
    setErrors(null);
    // update funckey
    const res = await funckeyUpdate(position, funckey);
    if (res.error) {
      setErrors(res.error[0]);
    } else {
      await funckeysGet();
      onClose();
      toaster.create({
        title: t("funckeys.success"),
        description: t("funckeys.edited"),
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
      funckeyPosition={position}
      setFunckeyPosition={setPosition}
      funckey={funckey}
      setFunckey={setFunckey}
      submit={submit}
      errors={errors}
      edit
    />
  );
};

export default UserFunckeyEdit;
