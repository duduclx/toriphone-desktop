import { useEffect, useState } from "react";
import { Box, Button, Dialog, Field, Flex, Table, Text, useDisclosure } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";
import { ButtonAddUi, IconButtonDeleteUi, IconButtonUploadUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";
import VoicemailGreetingPlayer from "./VoicemailGreetingPlayer";

const VoicemailsGreetings = () => {
  // requirements
  const { t } = useTranslation();
  const { open, onOpen, onClose } = useDisclosure();

  // api
  const {
    voicemailGreetingsGet,
    voicemailGreetingsAdd,
    voicemailGreetingDelete,
    voicemailGreetingUnavailable,
    setVoicemailGreetingUnavailable,
    voicemailGreetingBusy,
    setVoicemailGreetingBusy,
    voicemailGreetingName,
    setVoicemailGreetingName,
  } = useWazo();

  // resource
  const [file, setFile] = useState(null);
  const [greetingType, setGreetingType] = useState("");

  useEffect(() => {
    voicemailGreetingsGet();
  }, []);

  const uploadToType = (type) => {
    setGreetingType(type);
    onOpen();
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "audio/wav") {
        // console.error("Invalid file type. Please select a WAV file.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toaster.create({
        type: "error",
        title: t("voicemails.greetings_file_none"),
        duration: 3000,
        closable: true,
      });
      return;
    }

    try {
      const upload = await voicemailGreetingsAdd(file, greetingType);
      if (upload.ok) {
        voicemailGreetingsGet();
        onClose();
        toaster.create({
          type: "success",
          title: t("voicemails.greetings_file_upload"),
          duration: 3000,
          closable: true,
        });
      } else {
        toaster.create({
          type: "error",
          title: t("voicemails.greetings_file_error"),
          description: `Statut : ${upload.status}`,
          duration: 3000,
          closable: true,
        });
      }
    } catch (error) {
      toaster.create({
        type: "error",
        title: t("voicemails.greetings_file_error_unexpected"),
        description: error.message,
        duration: 3000,
        closable: true,
      });
    }
  };

  const handleDelete = async (type) => {
    await voicemailGreetingDelete(type);
    if (type == "unavailable") {
      setVoicemailGreetingUnavailable(false);
    }
    if (type == "busy") {
      setVoicemailGreetingBusy(false);
    }
    if (type == "name") {
      setVoicemailGreetingName(false);
    }
  };

  return (
    <Flex flexDirection="column" flex="1" p="2">
      <Table.ScrollArea width="100%" height="calc(100vh - 220px)" overflowY="auto" className="hide-scrollbar">
        <Table.Root>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("voicemails.greetings_header_when")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("voicemails.greetings_header_message")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row bg="TableBodyBg">
              <Table.Cell>{t("voicemails.greetings_unavailable")}</Table.Cell>
              <Table.Cell>
                {voicemailGreetingUnavailable ? (
                  <VoicemailGreetingPlayer type="unavailable" />
                ) : (
                  <Text>{t("voicemails.greetings_none")}</Text>
                )}
              </Table.Cell>
              <Table.Cell>
                {voicemailGreetingUnavailable ? (
                  <IconButtonDeleteUi onClick={() => handleDelete("unavailable")} />
                ) : (
                  <IconButtonUploadUi onClick={() => uploadToType("unavailable")} />
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row bg="TableBodyBg">
              <Table.Cell>{t("voicemails.greetings_busy")}</Table.Cell>
              <Table.Cell>
                {voicemailGreetingBusy ? (
                  <VoicemailGreetingPlayer type="busy" />
                ) : (
                  <Text>{t("voicemails.greetings_none")}</Text>
                )}
              </Table.Cell>
              <Table.Cell>
                {voicemailGreetingBusy ? (
                  <IconButtonDeleteUi onClick={() => handleDelete("busy")} />
                ) : (
                  <IconButtonUploadUi onClick={() => uploadToType("busy")} />
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row bg="TableBodyBg">
              <Table.Cell>{t("voicemails.greetings_name")}</Table.Cell>
              <Table.Cell>
                {voicemailGreetingName ? (
                  <VoicemailGreetingPlayer type="name" />
                ) : (
                  <Text>{t("voicemails.greetings_none")}</Text>
                )}
              </Table.Cell>
              <Table.Cell>
                {voicemailGreetingName ? (
                  <IconButtonDeleteUi onClick={() => handleDelete("name")} />
                ) : (
                  <IconButtonUploadUi onClick={() => uploadToType("name")} />
                )}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      <Dialog.Root open={open} onOpenChange={onClose}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="bgDefault">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{t("voicemails.greetings_file_add")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Field.Root>
                <Field.Label>{t("voicemails.greetings_file_select")}</Field.Label>
                <Box display="flex" justifyContent="space-between" gap="4" width="100%">
                  <InputUi
                    id="file"
                    type="file"
                    accept="audio/wav"
                    opacity="0"
                    position="absolute"
                    zIndex="-1"
                    onChange={handleFileChange}
                  />
                  <Button colorPalette="secondary" as="label" htmlFor="file" textAlign="center">
                    {t("common.browse")}
                  </Button>
                  <InputUi readOnly value={file ? file.name : ""} width="full" />
                </Box>
                <Field.HelperText>{t("voicemails.greetings_file_helper")}</Field.HelperText>
              </Field.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <ButtonAddUi onClick={() => handleFileUpload()} />
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Flex>
  );
};

export default VoicemailsGreetings;
