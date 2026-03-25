import { Flex, Separator, Text, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ButtonAddUi } from "../../../ui";

import HeaderSearch from "../../header/search/HeaderSearch";
import { useWazo } from "../../../services/WazoProvider";
import MeetCard from "./MeetCard";
import MeetAdd from "./MeetAdd";

const MeetContent = () => {
  // requirements
  const { t } = useTranslation();
  const { open, onOpen, onClose } = useDisclosure();

  // api
  const { meetings } = useWazo();

  return (
    <Flex flexDirection="column" height="100vh" flex="1" p="2" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t("meetings.page_title")}
        </Text>
        <HeaderSearch />
      </Flex>
      <Separator />
      <Flex m="4">
        <ButtonAddUi onClick={() => onOpen()} />
      </Flex>
      <Flex
        flexDirection="row"
        flex="1"
        p="8"
        gap="8"
        flexWrap="wrap"
        overflowX="auto"
        maxHeight="calc(100vh - 150px)"
        justifyContent="flex-start"
        alignContent="flex-start"
        className="hide-scrollbar"
      >
        {meetings.map((meeting, index) => (
          <MeetCard key={index} meeting={meeting} index={index} />
        ))}
      </Flex>
      <MeetAdd open={open} onClose={onClose}/>
    </Flex>
  );
};

export default MeetContent;
