import { Flex, Table, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";
import VoicemailsTableContent from "./VoicemailsTableContent";

const VoicemailsTable = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { voicemails } = useWazo();

  if (voicemails.length < 1) {
    return (
      <Flex flexDirection="row" flex={1} justifyContent="center">
        <Text mt={4}>{t("voicemails.no_messages")}</Text>
      </Flex>
    );
  } else {
    return (
      <Table.ScrollArea width="100%" height="calc(100vh - 220px)" overflowY="auto" className="hide-scrollbar">
        <Table.Root>
          <Table.Caption>{t("voicemails.table_footer")}</Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("voicemails.table_caller")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("voicemails.table_date")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("voicemails.table_message")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("voicemails.table_read")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {voicemails.map((voicemail, index) => (
              <VoicemailsTableContent voicemail={voicemail} key={index} />
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    );
  }
};

export default VoicemailsTable;
