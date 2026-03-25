import { Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import CallLogFilter from "./CallLogFilter";
import PhoneSidebarCalls from "../../phone/sidebar/PhoneSidebarCalls";

import FlexSidebar from "../../sidebar/FlexSidebar";

const CallLogSidebar = () => {
  // requirements
  const { t } = useTranslation();

  return (
    <FlexSidebar>
      <Text p="2" mb="4" textAlign="center" as="b">
        {t("callLog.sidebar_title")}
      </Text>
      <PhoneSidebarCalls />
      <Box mt="8">
        <CallLogFilter />
      </Box>
    </FlexSidebar>
  );
};

export default CallLogSidebar;
