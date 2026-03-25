import { useEffect } from "react";
import { Text, Spacer, Button, VStack } from "@chakra-ui/react";
import { NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import FlexSidebar from "../../sidebar/FlexSidebar";
import PhoneSidebarCalls from "../../phone/sidebar/PhoneSidebarCalls";
import { useWazo } from "../../../services/WazoProvider";

const VoicemailsSidebar = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const {
    call,
    voicemailsFolder,
    setVoicemailsFolder,
    voicemailUser,
    voicemailUserGet,
    voicemailUserEdit,
  } = useWazo();

  // filter
  const voicemailsOptions = [
    { label: t("voicemails.all"), value: "all" },
    { label: t("voicemails.read"), value: "old" },
    { label: t("voicemails.unread"), value: "new" },
  ];

  useEffect(() => {
    voicemailUserGet();
  }, []);

  const voicemailToggle = async () => {
    const voicemail = { ...voicemailUser, enabled: !voicemailUser.enabled };
    await voicemailUserEdit(voicemail);
    voicemailUserGet();
  };

  return (
    <FlexSidebar>
      <Text p="2" mb="4" textAlign="center" as="b">
        {t("voicemails.sidebar_title")}
      </Text>
      <PhoneSidebarCalls />
      <VStack gap="4" mt="8">
        <Text>{t("voicemails.filter")} :</Text>
        <NativeSelectUi value={voicemailsFolder} onChange={(e) => setVoicemailsFolder(e.target.value)}>
          {voicemailsOptions.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </NativeSelectUi>
        <Button colorPalette="primary" onClick={() => call("*98")}>{t("voicemails.sidebar_button_config")}</Button>
        <Button colorPalette="secondary" whiteSpace="pre-wrap" onClick={() => call("*90")}>
          {t("voicemails.sidebar_button_active")}
        </Button>
        {/* voicemailUser && 
        <Switch 
        isChecked={voicemailUser.enabled}
        onChange={() => voicemailToggle()}
        />
        */}
      </VStack>
      <Spacer />
    </FlexSidebar>
  );
};

export default VoicemailsSidebar;
