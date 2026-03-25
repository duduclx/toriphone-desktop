import { Box, Text, HStack, Separator, Flex } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import PhoneSidebarCallSession from "./PhoneSidebarCallSession";

import { useWazo } from "../../../services/WazoProvider";

const PhoneSidebarCalls = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { appLarge } = useWazo();

  return (
    <Flex flexDirection="column">
      <HStack justifyContent="space-between">
        <Text pl="4" pb="2">
          {t("phone.lines_title")}
        </Text>
      </HStack>
      <Separator />
      <Box minHeight="24">
        <PhoneSidebarCallSession />
      </Box>
      {appLarge && <Separator />}
    </Flex>
  );
};

export default PhoneSidebarCalls;
