import { Text, Spacer } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import FlexSidebar from "../../sidebar/FlexSidebar";
import PhoneSidebarCalls from "../../phone/sidebar/PhoneSidebarCalls";
import SwitchboardCalls from "./SwitchboardCalls";

const SwitchboardSidebar = () => {
  // requirements
  const { t } = useTranslation();

  return (
    <FlexSidebar>
      <Text p="2" textAlign="center" as="b" mb="4">
        {t("switchboard.sidebar_title")}
      </Text>
      <PhoneSidebarCalls />
      <SwitchboardCalls />
      <Spacer />
    </FlexSidebar>
  );
};

export default SwitchboardSidebar;
