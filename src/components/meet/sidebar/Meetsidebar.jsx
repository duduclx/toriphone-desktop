import { Text, Spacer } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PhoneSidebarCalls from "../../phone/sidebar/PhoneSidebarCalls";
import Conferences from "./Conferences";
import MeetCalendar from "./MeetCalendar";
import FlexSidebar from "../../sidebar/FlexSidebar";

const Meetsidebar = () => {
  // requirements
  const { t } = useTranslation();

  return (
    <FlexSidebar>
      <Text p="2" mb="4" textAlign="center" as="b">
        {t("meetings.sidebar_title")}
      </Text>
      <PhoneSidebarCalls />
      {/* <Conferences /> */}
      <MeetCalendar />
      <Spacer />
    </FlexSidebar>
  );
};

export default Meetsidebar;
