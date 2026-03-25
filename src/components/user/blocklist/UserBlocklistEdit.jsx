import { useEffect, useState } from "react";
import { toaster } from "../../ui/toaster";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";
import UserBlocklistForm from "./UserBlocklistForm";

const UserBlocklistEdit = ({ open, onClose }) => {
  // requirement
  const { t } = useTranslation();
  
  // api
  const { blocklist, setBlocklist, blocklistUpdate, blocklistsGet } = useWazo();

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
    const cleanedNumber = {
      label: blocklistNumber.label,
      number: blocklistNumber.number.replace(/\s+/g, ""),
      uuid: blocklistNumber.uuid,
    };
    const res = await blocklistUpdate(cleanedNumber);
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
      setBlocklist({});
      await blocklistsGet();
      onClose();
      toaster.create({
          title: t("blocklist.success"),
          description: t("blocklist.edited"),
          type: 'success',
          duration: 3000,
          closable: true,
        });
    }
  };

  return (
    <UserBlocklistForm
      open={open}
      onClose={onClose}
      blocklistNumber={blocklistNumber}
      setBlocklistNumber={setBlocklistNumber}
      submit={submit}
      errors={errors}
      edit
    />
  );
};

export default UserBlocklistEdit;
