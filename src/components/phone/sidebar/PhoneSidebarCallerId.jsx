import { useEffect, useState } from "react";
import { Flex, Field } from "@chakra-ui/react";
import { NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

const PhoneSidebarCallerId = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const {
    userCallerIds,
    userOutgoingCallerIdsGet,
    userCallerId,
    setUserCallerId,
    userOutgoingCallerIdGet,
    userOutgoingCallerIdUpdate,
    userOutgoingCallerId,
    setUserOutgoingCallerId,
  } = useWazo();

  // states
  const [callerIds, setCallerIds] = useState({ items: [] });

  // format callerIds
  useEffect(() => {
    if (!userCallerIds?.items) return;

    const mapped = userCallerIds.items.map((item) => {
      let label;
      let value;

      switch (item.type) {
        case "main":
          label = t("phone.caller_id_default") + " - " + item.number;
          value = "default";
          break;
        case "shared":
          label = t("phone.caller_id_shared") + " - " + item.number;
          value = item.number;
          break;
        case "anonymous":
          label = t("phone.caller_id_anonymous");
          value = "anonymous";
          break;
        case "associated":
          label = t("phone.caller_id_associated") + " - " + item.number;
          value = item.number;
          break;
        default:
          label = item.type + (item.number ? " - " + item.number : "");
          value = item.number || item.type;
      }

      return { value, label };
    });

    setCallerIds({ items: mapped });
  }, [userCallerIds]);

  // load values
  useEffect(() => {
    userOutgoingCallerIdsGet();
    //userOutgoingCallerIdGet(); mis au chargement de l'app
  }, []);

  // update
  const handleChange = async (e) => {
    const newValue = e.target.value;
    setUserOutgoingCallerId(newValue);

    const { call_record_enabled, ...user } = {
      ...userCallerId,
      outgoing_caller_id: newValue,
    };
    setUserCallerId(user);
    await userOutgoingCallerIdUpdate(user);
  };

  return (
    <Flex mt="4">
      <Field.Root>
        <Field.Label>{t("phone.caller_id_title")} :</Field.Label>
        {callerIds.items && (
          <NativeSelectUi value={userOutgoingCallerId} onChange={handleChange} mx="1">
            {callerIds.items.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </NativeSelectUi>
        )}
      </Field.Root>
    </Flex>
  );
};

export default PhoneSidebarCallerId;
