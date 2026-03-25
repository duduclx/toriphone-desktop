import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge, Button, Code, IconButton, Dialog, Flex, HStack, Table, useDisclosure } from "@chakra-ui/react";
import { FaAngleLeft, FaQuestion } from "react-icons/fa";
import { toaster } from "../../ui/toaster";

import { useWazo } from "../../../services/WazoProvider";
import formatDate from "../../../utils/formatDate";

const UserWebhookLog = ({ setWebhooksPage }) => {
  // requirements
  const { t } = useTranslation();
  const { open, onOpen, onClose } = useDisclosure();

  // api
  const { webhookUser, webhookUserLogGet } = useWazo();

  // value
  const [logs, setLogs] = useState([]);
  const [log, setLog] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const res = await webhookUserLogGet(webhookUser);
      setLogs(res);
    };
    fetch();
  }, []);

  // copy details to clipboard
  const handleCopyToClipboard = () => {
    const content = JSON.stringify(log.event.data, null, 2);
    navigator.clipboard.writeText(content).then(() => {
      toaster.create({
        title: t("webhooks.copy_title"),
        description: t("webhooks.copy_description"),
        type: "success",
        duration: 3000,
        closable: true,
      });
    });
  };

  return (
    <>
      <Flex mt="4" ml="4">
        <HStack gap="4">
          <Button colorPalette="primary" onClick={() => setWebhooksPage("webhooksList")}>
            <FaAngleLeft /> Retour
          </Button>
        </HStack>
      </Flex>
      <Flex flexDirection="column" justifyContent="flex-start" flex="1" alignItems="center" mt="4">
        <Table.ScrollArea width="100%" height="calc(100vh - 220px)" overflowY="auto" className="hide-scrollbar">
          <Table.Root>
            <Table.Caption captionSide="top" fontSize="xl" mb="4">Log du Webhook : {webhookUser.name}</Table.Caption>
            <Table.Header>
              <Table.Row bg="TableHeaderBg">
                <Table.ColumnHeader>{t("webhooks.uuid")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("webhooks.attempts")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("webhooks.status")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("webhooks.start")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("webhooks.end")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("webhooks.events")}</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {logs.items && logs.items.length > 0 ? (
                logs.items.map((item, index) => (
                  <Table.Row key={index} bg="TableBodyBg">
                    <Table.Cell>{item.uuid}</Table.Cell>
                    <Table.Cell>
                      {item.attempts} / {item.max_attempts}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        variant="subtle"
                        borderRadius="6"
                        fontSize="0.8em"
                        colorPalette={item.status === "failure" ? "danger" : "secondary"}
                      >
                        {item.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>{formatDate(item.started_at)}</Table.Cell>
                    <Table.Cell>{formatDate(item.ended_at)}</Table.Cell>
                    <Table.Cell>
                      <IconButton
                        variant="ghost"
                        colorPalette="secondary"
                        onClick={() => {
                          setLog(item);
                          onOpen();
                        }}
                      >
                        <FaQuestion />
                      </IconButton>
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
      <Dialog.Root open={open} onOpenChange={onClose} scrollBehavior="inside" size="xl">
        <Dialog.Backdrop width="100%" />
        <Dialog.Positioner>
          <Dialog.Content bg="bgDefault">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{t("webhooks.log_detail")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Code width="full" whiteSpace="pre-wrap">
                {log.event && JSON.stringify(log.event.data, null, 2)}
              </Code>
            </Dialog.Body>

            <Dialog.Footer>
              <Button colorPalette="primary" mr="3" onClick={handleCopyToClipboard}>
                {t("webhooks.copy")}
              </Button>
              <Button colorPalette="danger" onClick={onClose}>
                {t("webhooks.close")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default UserWebhookLog;
