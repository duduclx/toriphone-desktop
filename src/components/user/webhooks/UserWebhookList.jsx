import { useEffect } from "react";
import { Box, Flex, HStack, IconButton, Table, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "../../ui/tooltip";
import { FaFileAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { ButtonAddUi, IconButtonDeleteUi, IconButtonEditUi } from "../../../ui";
import { useWazo } from "../../../services/WazoProvider";

import UserWebhookAdd from "./UserWebhookAdd";
import UserWebhookEdit from "./UserWebhookEdit";
import UserWebhookDelete from "./UserWebhookDelete";

const UserWebhookList = ({ setWebhooksPage }) => {
    // requirements
  const { t } = useTranslation();
  const { open, onOpen, onClose } = useDisclosure();
  const { open: openEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { open: openDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

  // api
  const { webhooksUser, setWebhookUser, webhooksUserGet } = useWazo();

  // update
  const onEdit = async (item) => {
    setWebhookUser(item);
    onOpenEdit();
  };

  // delete
  const onDelete = async (item) => {
    setWebhookUser(item);
    onOpenDelete();
  };

  // load
  useEffect(() => {
    webhooksUserGet();
  }, []);

  return (
    <>
      <Flex mt="4" ml="4">
        <HStack gap="4">
          <ButtonAddUi onClick={() => onOpen()} />
        </HStack>
      </Flex>
      <Flex flexDirection="column" justifyContent="flex-start" flex="1" alignItems="center" mt="4">
        <Table.ScrollArea width="100%" height="calc(100vh - 220px)" overflowY="auto" className="hide-scrollbar">
          <Table.Root variant="simple">
            <Table.Header>
              <Table.Row bg="TableHeaderBg">
                <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("webhooks.name")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("webhooks.service")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("webhooks.method")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("webhooks.url")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("webhooks.events")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("webhooks.log")}</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {webhooksUser.items && webhooksUser.total > 0 ? (
                webhooksUser.items.map((item, index) => (
                  <Table.Row key={index} bg="TableBodyBg">
                    <Table.Cell>
                      <Flex>
                        <IconButtonEditUi onClick={() => onEdit(item)} />
                        <IconButtonDeleteUi onClick={() => onDelete(item)} />
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.service}</Table.Cell>
                    <Table.Cell>{item.config.method || ""}</Table.Cell>
                    <Table.Cell>{item.config.url || ""}</Table.Cell>
                    <Table.Cell>
                      <Tooltip
                        content={item.events.map((event, index) => (
                          <div key={index}>{event}</div>
                        ))}
                      >
                        <span>{item.events.length}</span>
                      </Tooltip>
                    </Table.Cell>
                    <Table.Cell>
                      <Box as="span">
                        <IconButton
                            colorPalette="secondary"
                          variant="ghost"
                          onClick={() => {
                            setWebhookUser(item);
                            setWebhooksPage("webhookLog");
                        }}
                        >
                          <FaFileAlt />
                        </IconButton>
                      </Box>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row bg="TableBodyBg">
                  <Table.Cell colSpan="7" textAlign="center">
                    {t("webhooks.none")}
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Flex>
      <UserWebhookAdd open={open} onClose={onClose} />
      <UserWebhookEdit open={openEdit} onClose={onCloseEdit} />
      <UserWebhookDelete open={openDelete} onClose={onCloseDelete} />
    </>
  )
}

export default UserWebhookList
