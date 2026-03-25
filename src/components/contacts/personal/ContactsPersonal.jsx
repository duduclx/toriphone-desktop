import { useState, useEffect } from "react";
import { Box, Flex, Text, Separator, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

import ContactsFilter from "../common/ContactsFilter";
import PersonalAdd from "./PersonalAdd";
import PersonalCard from "./PersonalCard";
import HeaderSearch from "../../header/search/HeaderSearch";
import EmptyContacts from "../common/EmptyContacts";
import TemplatePagination from "../../../templates/TemplatePagination";

const ContactsPersonal = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { contactsPersonal, appLarge, showSidebar } = useWazo();

  // filter
  const [searchText, setSearchText] = useState("");

  // resources
  const filteredPersonal = contactsPersonal.filter((person) =>
    person.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  useEffect(() => {
    if (!appLarge) {
      setItemsPerPage(8);
    } else if (showSidebar) {
      setItemsPerPage(16);
    } else {
      setItemsPerPage(20);
    }
  }, [appLarge, showSidebar]);

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredPersonal.slice(offset, offset + itemsPerPage);

  const pageCount = Math.ceil(filteredPersonal.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [pageCount]);

  return (
    <Flex flexDirection="column" flex="1" p="2" height="100vh" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t("contacts.page_title_personal")}
        </Text>
        <HeaderSearch />
      </Flex>
      <Separator />
      <Flex mt="8" ml="4">
        <HStack gap="8">
          <PersonalAdd />
          <ContactsFilter searchText={searchText} setSearchText={setSearchText} />
        </HStack>
      </Flex>
      {currentItems.length > 0 ? (
        <>
          <Flex
            flexDirection="row"
            flex="1"
            p="8"
            flexWrap="wrap"
            justifyContent="flex-start"
            overflowX="auto"
            maxHeight="calc(100vh - 220px)"
            alignContent="flex-start"
            className="hide-scrollbar"
          >
            {currentItems.map((person, index) => (
              <PersonalCard key={index} person={person} index={index} />
            ))}
          </Flex>
          <Box alignSelf="center">
            <TemplatePagination pageCount={pageCount} page={currentPage} handlePageChange={handlePageClick}/>
          </Box>
        </>
      ) : (
        <EmptyContacts text={t("contacts.personal_empty")} sub={t("contacts.personal_empty_sub")} />
      )}
    </Flex>
  );
};

export default ContactsPersonal;
