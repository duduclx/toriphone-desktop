import { Flex, Text, Separator } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import HeaderSearch from "../../header/search/HeaderSearch";
import ChatDialerPage from "./ChatDialerPage";
import EmptyContacts from "../../contacts/common/EmptyContacts";

import { useWazo } from "../../../services/WazoProvider";

const ChatContent = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { chatRoom } = useWazo();

  return (
    <Flex flexDirection="column" height="100vh" flex="1" p="2" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t("chat.page_title")}
        </Text>
        <HeaderSearch />
      </Flex>
      <Separator />
      {chatRoom && Object.keys(chatRoom).length > 0 ? (
        <Flex
          flexDirection="row"
          flex="1"
          p="2"
          flexWrap="wrap"
          justifyContent="flex-start"
          alignContent="flex-start"
          overflowX="auto"
          className="hide-scrollbar"
          maxWidth="100%"
        >
          <ChatDialerPage />
        </Flex>
      ) : (
        <EmptyContacts text={t("chat.room_empty")} sub={t("chat.room_empty_sub")} />
      )}
    </Flex>
  );
};

export default ChatContent;
