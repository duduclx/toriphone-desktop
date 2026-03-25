import { Text, Spacer } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PhoneSidebarDialer from "./PhoneSidebarDialer";
import PhoneSidebarCalls from "./PhoneSidebarCalls";
import PhoneSidebarFavs from "./PhoneSidebarFavs";
import PhoneSidebarCallerId from "./PhoneSidebarCallerId";

import FlexSidebar from "../../sidebar/FlexSidebar";

const PhoneSidebar = () => {
  // requirements
  const { t } = useTranslation();

  return (
    <FlexSidebar>
      <Text p="2" mb="4" textAlign="center" as="b">
        {t("phone.sidebar_title")}
      </Text>
      <PhoneSidebarCalls />
      <PhoneSidebarCallerId />
      <PhoneSidebarDialer />
      <Spacer />
      <PhoneSidebarFavs />
    </FlexSidebar>
  );
};

export default PhoneSidebar;
