import { useEffect, useState } from "react";
import { Flex, HStack, Separator, Table, Text, useDisclosure } from "@chakra-ui/react";

import { ButtonAddUi, IconButtonDeleteUi, IconButtonEditUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import HeaderSearch from "../../header/search/HeaderSearch";
import TemplatePagination from "../../../templates/TemplatePagination";
import TemplateSearchForm from "../../../templates/TemplageSearchForm";
import TemplateSearchItemsForm from "../../../templates/TemplateSearchItemsForm";

import UserExternalAdd from "./UserExternalAdd";
import UserExternalEdit from "./UserExternalEdit";
import UserExternalDelete from "./UserExternalDelete";

import { useWazo } from "../../../services/WazoProvider";

const UserExternals = () => {
  // requirements
  const { t } = useTranslation();
  const { open, onOpen, onClose } = useDisclosure();
  const { open: openEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { open: openDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

  // api
  const { externalAppsUser, setExternalAppUser, externalAppsUserGet, externalAppsUserPageGet, appItemsPerPage } =
    useWazo();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, appItemsPerPage]);

  useEffect(() => {
    if (externalAppsUserPageGet) {
      const offset = page * parseInt(appItemsPerPage, 10);
      externalAppsUserPageGet(search, offset, parseInt(appItemsPerPage, 10));
    }
  }, [search, page, appItemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  // update
  const onEdit = async (item) => {
    setExternalAppUser(item);
    onOpenEdit();
  };

  // delete
  const onDelete = async (item) => {
    setExternalAppUser(item);
    onOpenDelete();
  };

  // load
  useEffect(() => {
    externalAppsUserGet();
  }, []);

  return (
    <Flex flex="1" flexDirection="column" justifyContent="flex-start" p="2" height="100vh" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t("externals.title")}
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
          <Table.Root variant="simple">
            <Table.Header>
              <Table.Row bg="TableHeaderBg">
                <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("externals.name")}</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {externalAppsUser.items && externalAppsUser.total > 0 ? (
                externalAppsUser.items.map((item, index) => (
                  <Table.Row key={index} bg="TableBodyBg">
                    <Table.Cell>
                      <Flex>
                        <IconButtonEditUi  onClick={() => onEdit(item)} />
                        <IconButtonDeleteUi onClick={() => onDelete(item)} />
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>{item.label}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row bg="TableBodyBg">
                  <Table.Cell colSpan="2" textAlign="center">
                    {t("externals.none")}
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Flex>
      <Flex flex="1" justifyContent="center">
        <TemplatePagination items={externalAppsUser} page={page} handlePageChange={handlePageChange} />
      </Flex>
      <UserExternalAdd open={open} onClose={onClose} />
      <UserExternalEdit open={openEdit} onClose={onCloseEdit} />
      <UserExternalDelete open={openDelete} onClose={onCloseDelete} />
    </Flex>
  );
};

export default UserExternals;
