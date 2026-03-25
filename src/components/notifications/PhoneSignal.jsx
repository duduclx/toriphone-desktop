import { useEffect } from "react";
import { toaster } from "../ui/toaster";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../services/WazoProvider";

const PhoneSignal = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { chatSignal, setChatSignal } = useWazo();

  useEffect(() => {
    if (chatSignal?.user) {
      toaster.create({
        title: chatSignal.user,
        description: t("phone.send_signal_message"),
        type: "success",
        duration: 3000,
        closable: true,
      });

      setChatSignal(null);
    }
  }, [chatSignal]);

  return null;
};

export default PhoneSignal;
