import { Flex, Text, Separator } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PhoneCallPage from "./PhoneCallPage";
import HeaderSearch from "../../header/search/HeaderSearch";

import { useWazo } from "../../../services/WazoProvider";

const PhoneCall = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { isFullScreen } = useWazo();

  return (
    <Flex flexDirection="column" height="100vh" flex="1" p="2" overflow="hidden">
      {!isFullScreen && (
        <>
          <Flex justifyContent="space-between" alignItems="center" px="8">
            <Text p="2" as="b" fontSize="3xl" truncate>
              {t("phone.page_title")}
            </Text>
            <HeaderSearch />
          </Flex>
          <Separator />
        </>
      )}
      <Flex
        flexDirection="column"
        flex="1"
        p="2"
        flexWrap="nowrap"
        overflowX="auto"
        justifyContent="flex-start"
        alignContent="center"
        className="hide-scrollbar"
      >
        <PhoneCallPage />
      </Flex>
    </Flex>
  );
};

export default PhoneCall;
