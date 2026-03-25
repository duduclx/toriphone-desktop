import { useEffect, useState } from "react";
import { Box, Flex, Table, Text } from "@chakra-ui/react";

import { useWazo } from "../../../services/WazoProvider";
import { useTranslation } from "react-i18next";
import CallLogTableContent from "./CallLogTableContent";
import TemplatePagination from "../../../templates/TemplatePagination";

const CallLogTable = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { callLog, callLogFiltered } = useWazo();

  // pagination
  const [currentPage, setCurrentPage] = useState(0);

  const currentCallLog = callLogFiltered.length >= 1 ? callLogFiltered : callLog;

  const itemsPerPage = 10;

  const offset = currentPage * itemsPerPage;
  const currentItems = currentCallLog.slice(offset, offset + itemsPerPage);

  const pageCount = Math.ceil(currentCallLog.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [callLog, callLogFiltered]);

  return (
    <>
      {callLogFiltered.message ? (
        <Flex justifyContent="center" flex="1">
          <Box mt="4">
            <Text as="b" fontSize="xl">
              {t("callLog.filter_no_result")}
            </Text>
          </Box>
        </Flex>
      ) : (
        <Flex flexDirection="column" justifyContent="center" flex="1" alignItems="center" mt="8">
          <Table.ScrollArea width="100%" height="calc(100vh - 170px)" overflowY="auto">
            <Table.Root >
              <Table.Caption></Table.Caption>
              <Table.Header>
                <Table.Row bg="TableHeaderBg">
                  <Table.ColumnHeader>{t("callLog.table_type")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("callLog.table_date")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("callLog.table_name")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("callLog.table_number")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("callLog.table_record")}</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {currentItems.map((callLog, index) => (
                  <CallLogTableContent callLog={callLog} key={index} />
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
          <TemplatePagination pageCount={pageCount} page={currentPage} handlePageChange={handlePageClick}/>
        </Flex>
      )}
    </>
  );
};

export default CallLogTable;
