import { useEffect, useState } from "react";
import { Flex, HStack, Separator, Table, Text, useDisclosure } from "@chakra-ui/react";
import { ButtonAddUi, CheckboxUi, IconButtonDeleteUi, IconButtonEditUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

import HeaderSearch from "../../header/search/HeaderSearch";
import UserFunckeyAdd from "./UserFunckeyAdd";
import UserfunckeyDelete from "./UserfunckeyDelete";
import UserFunckeyEdit from "./UserFunckeyEdit";

const UserFunckeys = () => {
  // requirements
  const { t } = useTranslation();
  const { open, onOpen, onClose } = useDisclosure();
  const { open: openEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { open: openDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

  // api
  const { funckeys, setFunckey, funckeysGet } = useWazo();

  // values
  const [position, setPosition] = useState(null);

  // update
  const onEdit = (position, funckey) => {
    setPosition(position);
    setFunckey(funckey);
    onOpenEdit();
  };

  // delete
  const onDelete = (position, funckey) => {
    setPosition(position);
    setFunckey(funckey);
    onOpenDelete();
  };

  // load
  useEffect(() => {
    funckeysGet();
  }, []);

  return (
    <Flex flex="1" flexDirection="column" p="2" height="100vh" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t("funckeys.title")}
        </Text>
        <HeaderSearch />
      </Flex>
      <Separator />
      <Flex mt="4" ml="4">
        <HStack gap="8">
          <ButtonAddUi onClick={onOpen} />
        </HStack>
      </Flex>
      <Flex flexDirection="column" justifyContent="center" flex="1" alignItems="center" mt="4">
        <Table.ScrollArea width="100%" height="calc(100vh - 220px)" overflowY="auto" className="hide-scrollbar">
          <Table.Root variant="line">
            <Table.Header>
              <Table.Row bg="TableHeaderBg">
                <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("funckeys.position")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("funckeys.label")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("funckeys.destination")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("funckeys.blf")}</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {funckeys.keys ? (
                Object.entries(funckeys.keys).map(([position, funckey], index) => (
                  <Table.Row key={index} bg="TableBodyBg">
                    <Table.Cell>
                      <Flex>
                        <IconButtonEditUi onClick={() => onEdit(position, funckey)} />
                        <IconButtonDeleteUi onClick={() => onDelete(position, funckey)} />
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>{position}</Table.Cell>
                    <Table.Cell>{funckey.label}</Table.Cell>
                    <Table.Cell>{funckey.destination.type || ""}</Table.Cell>
                    <Table.Cell>
                      <CheckboxUi checked={funckey.blf} />
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row bg="TableBodyBg">
                  <Table.Cell colSpan="3" textAlign="center">
                    {t("funckeys.none")}
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Flex>
      <UserFunckeyAdd open={open} onClose={onClose} />
      <UserFunckeyEdit open={openEdit} onClose={onCloseEdit} position={position} setPosition={setPosition}/>
      <UserfunckeyDelete open={openDelete} onClose={onCloseDelete} position={position} />
    </Flex>
  );
};

export default UserFunckeys;
