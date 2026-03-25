import { Flex, Text, Separator, Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import HeaderSearch from "../../header/search/HeaderSearch";
import VoicemailsTable from "./VoicemailsTable";
import VoicemailsGreetings from "./VoicemailsGreetings";

const VoicemailsContent = () => {
  // requirements
  const { t } = useTranslation();

  return (
    <Flex flexDirection="column" height="100vh" flex="1" p="2" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t("voicemails.page_title")}
        </Text>
        <HeaderSearch />
      </Flex>
      <Separator />
      <Flex
        flexDirection="column"
        p="2"
        flexWrap="nowrap"
        overflowX="auto"
        justifyContent="flex-start"
        alignContent="center"
        className="hide-scrollbar"
      >
      <Tabs.Root defaultValue="voicemail" mt="4">
        <Tabs.List>
          <Tabs.Trigger value="voicemail">{t("voicemails.voicemail")}</Tabs.Trigger>
          <Tabs.Trigger value="configuration">{t("voicemails.configuration")}</Tabs.Trigger>
        </Tabs.List>
          <Tabs.Content value="voicemail" mt="4">
            <VoicemailsTable />
          </Tabs.Content>
          <Tabs.Content value="configuration" mt="4">
            <VoicemailsGreetings />
          </Tabs.Content>
      </Tabs.Root>

      </Flex>
    </Flex>
  );
};

export default VoicemailsContent;
