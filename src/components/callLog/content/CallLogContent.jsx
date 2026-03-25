import { useEffect } from "react";
import { Flex, Text, Separator } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import CallLogTable from "./CallLogTable";
import CallLogLength from "./CallLogLength";
import HeaderSearch from "../../header/search/HeaderSearch";

import { useWazo } from "../../../services/WazoProvider";

const CallLogContent = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { callLogGet } = useWazo();

  useEffect(() => {
    callLogGet();
  }, [])

  return (
    <Flex flexDirection="column" height="100vh" flex="1" p="2" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t("callLog.page_title")}
        </Text>
        <CallLogLength />
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
        <CallLogTable />
      </Flex>
    </Flex>
  );
};

export default CallLogContent;
