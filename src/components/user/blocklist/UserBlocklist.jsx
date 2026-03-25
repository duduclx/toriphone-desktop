import { useEffect, useState } from "react";
import { Flex, HStack, Separator, Table, Text, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { ButtonAddUi, IconButtonDeleteUi, IconButtonEditUi } from "../../../ui";
import { useWazo } from "../../../services/WazoProvider";

import HeaderSearch from "../../header/search/HeaderSearch";
import UserBlocklistAdd from "./UserBlocklistAdd";
import UserBlocklistEdit from "./UserBlocklistEdit";
import UserBlocklistDelete from "./UserBlocklistDelete";
import TemplatePagination from "../../../templates/TemplatePagination";
import TemplateSearchForm from "../../../templates/TemplageSearchForm";
import TemplateSearchItemsForm from "../../../templates/TemplateSearchItemsForm";

const UserBlocklist = () => {
  // requirements
  const { t } = useTranslation();
  const { open, onOpen, onClose } = useDisclosure();
  const { open: openEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { open: openDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

  // api
  const { blocklists, blocklistsGet, blocklistsPageGet, setBlocklist, appItemsPerPage } = useWazo();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, appItemsPerPage]);

  useEffect(() => {
    if (blocklistsPageGet) {
      const offset = page * parseInt(appItemsPerPage, 10);
      blocklistsPageGet(search, offset, parseInt(appItemsPerPage, 10));
    }
  }, [search, page, appItemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  // update
  const onEdit = async (item) => {
    setBlocklist(item);
    onOpenEdit();
  };

  // delete
  const onDelete = async (item) => {
    setBlocklist(item);
    onOpenDelete();
  };

  // load
  useEffect(() => {
    blocklistsGet();
  }, []);

  return (
    <Flex flex="1" flexDirection="column" p="2" height="100vh" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t("blocklist.title")}
        </Text>
        <HeaderSearch />
      </Flex>
      <Separator />
      <Flex mt="4" ml="4">
        <HStack gap="8">
          <ButtonAddUi onClick={() => onOpen()} />
          <TemplateSearchForm setSearch={setSearch} />
          <TemplateSearchItemsForm />
        </HStack>
      </Flex>
      <Flex flexDirection="column" justifyContent="center" flex="1" alignItems="center" mt="4">
        <Table.ScrollArea width="100%" height="calc(100vh - 220px)" overflowY="auto" className="hide-scrollbar">
          <Table.Root variant="line">
            <Table.Header>
              <Table.Row bg="TableHeaderBg">
                <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("blocklist.name")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("blocklist.number")}</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {blocklists.items && blocklists.total > 0 ? (
                blocklists.items.map((item, index) => (
                  <Table.Row key={index} bg="TableBodyBg">
                    <Table.Cell>
                      <Flex>
                        <IconButtonEditUi onClick={() => onEdit(item)} />
                        <IconButtonDeleteUi onClick={() => onDelete(item)} />
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>{item.label}</Table.Cell>
                    <Table.Cell>{item.number}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row bg="TableBodyBg">
                  <Table.Cell colSpan="3" textAlign="center">
                    {t("blocklist.none")}
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Flex>
      <Flex flex="1" justifyContent="center">
        <TemplatePagination items={blocklists} page={page} handlePageChange={handlePageChange} />
      </Flex>
      <UserBlocklistAdd open={open} onClose={onClose} />
      <UserBlocklistEdit open={openEdit} onClose={onCloseEdit} />
      <UserBlocklistDelete open={openDelete} onClose={onCloseDelete} />
    </Flex>
  );
};

export default UserBlocklist;
