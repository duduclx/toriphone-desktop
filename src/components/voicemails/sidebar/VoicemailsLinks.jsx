import { VStack, Text, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

import { NativeSelectUi } from "../../../ui";

const VoicemailsLinks = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { voicemailsFolder, setVoicemailsFolder, setAppCurrentPage } = useWazo();

  // filter
  const voicemailsOptions = [
    { label: t("voicemails.all"), value: "all" },
    { label: t("voicemails.read"), value: "old" },
    { label: t("voicemails.unread"), value: "new" },
  ];

  return (
    <VStack gap="4" mt="8">
      <Text>{t("voicemails.filter")} :</Text>
      <NativeSelectUi
        value={voicemailsFolder}
        onChange={(e) => {
          setAppCurrentPage("voicemails");
          setVoicemailsFolder(e.target.value);
        }}
      >
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
  );
};

export default VoicemailsLinks;
