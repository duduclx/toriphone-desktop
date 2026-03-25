import { useState, useEffect } from "react";
import { Box, Flex, Text, Separator } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

import FavoritesCard from "./FavoritesCard";
import HeaderSearch from "../../header/search/HeaderSearch";
import EmptyContacts from "../common/EmptyContacts";
import ContactsFilter from "../common/ContactsFilter";
import TemplatePagination from "../../../templates/TemplatePagination";

const ContactsFavorites = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { contactsFavorites, appLarge, showSidebar } = useWazo();

  // filter
  const [searchText, setSearchText] = useState("");

  // ressources
  const filteredFavorites = contactsFavorites.filter((person) =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
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
  const currentItems = filteredFavorites.slice(offset, offset + itemsPerPage);

  const pageCount = Math.ceil(filteredFavorites.length / itemsPerPage);

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
          {t("contacts.page_title_favorites")}
        </Text>
        <HeaderSearch />
      </Flex>
      <Separator />
      <Flex mt="8" ml="4">
        <ContactsFilter searchText={searchText} setSearchText={setSearchText} />
      </Flex>
      {currentItems.length > 0 ? (
        <>
          <Flex
            flexDirection="row"
            flex="1"
            p="8"
            flexWrap="wrap"
            overflowX="auto"
            maxHeight="calc(100vh - 220px)"
            justifyContent="flex-start"
            alignContent="flex-start"
            className="hide-scrollbar"
          >
            {currentItems.map((person, index) => (
              <FavoritesCard key={index} person={person} index={index} />
            ))}
          </Flex>
          <Box alignSelf="center">
            <TemplatePagination page={currentPage} pageCount={pageCount} handlePageChange={handlePageClick}/>
          </Box>
        </>
      ) : (
        <EmptyContacts text={t("contacts.favorites_empty")} sub={t("contacts.favorites_empty_sub")} />
      )}
    </Flex>
  );
};

export default ContactsFavorites;
