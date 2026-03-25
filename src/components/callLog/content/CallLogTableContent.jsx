import { Box, HStack, IconButton, Table, Tag, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaVideo, FaStar, FaCommentAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";
import CallRecordPlayer from "./CallLogRecordPlayer";

const CallLogTableContent = ({ callLog }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const {
    call,
    chatRoomCreate,
    setAppCurrentPage,
    contactsFavorites,
    contactsFavoritesAdd,
    contactsFavoritesRemove,
    contactsInternal,
    contactsPersonal,
    contactsPhonebook,
    contactsOffice,
    contactsGoogle,
  } = useWazo();

  // auth
  const { user } = useAuth();

  // format duration
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const isCaller = user.uuid == callLog.source.uuid;
  const isInternal = callLog.callDirection === "internal";

  // is contact
  const isContact = () => {
    const number = isCaller ? callLog.destination.extension : callLog.source.extension;

    const matchingContact = [
      ...(contactsInternal || []),
      ...(contactsPersonal || []),
      ...(contactsPhonebook || []),
      ...(contactsOffice || []),
      ...(contactsGoogle || []),
    ].find((contact) => contact.number === number);

    return matchingContact || false;
  };

  const contact = isContact();

  const isFavorited = contactsFavorites.some((favorite) => favorite.number === contact.number);

  return (
    <Table.Row bg="TableBodyBg">
      <Table.Cell>
        <Tag.Root size="md" variant="subtle" colorPalette="grey" borderRadius="full">
          <Box mr="8px">
            {isCaller ? (
              <FaArrowUp color={callLog.answered ? "green" : "red"} />
            ) : (
              <FaArrowDown color={callLog.answered ? "green" : "red"} />
            )}
          </Box>
          <Tag.Label>{formatDuration(callLog.duration)}</Tag.Label>
        </Tag.Root>
      </Table.Cell>
      <Table.Cell>{callLog.start.toLocaleString()}</Table.Cell>
      <Table.Cell>{isCaller ? callLog.destination.name : callLog.source.name}</Table.Cell>
      <Table.Cell>{isCaller ? callLog.destination.extension : callLog.source.extension}</Table.Cell>
      <Table.Cell>
        <HStack>
          <IconButton
            variant="ghost"
            size="sm"
            onClick={() => {
              const cleanNumber = isCaller ? callLog.destination.extension.replaceAll(" ", "") : callLog.source.extension.replaceAll(" ", "");
              call(cleanNumber, false)
            }}
          >
            <FaPhoneAlt />
          </IconButton>
          {isInternal && (
            <>
              <IconButton
                variant="ghost"
                size="sm"
                onClick={() => {
                  call(isCaller ? callLog.destination.extension : callLog.source.extension, true);
                  setAppCurrentPage("phone");
                }}
              >
                <FaVideo />
              </IconButton>
              <IconButton
                variant="ghost"
                size="sm"
                onClick={async () => {
                  const chatRoom = await chatRoomCreate("", [
                    { uuid: isCaller ? callLog.destination.uuid : callLog.source.uuid },
                  ]);
                  setAppCurrentPage("chat");
                }}
              >
                <FaCommentAlt />
              </IconButton>
            </>
          )}
          {contact && (
            <IconButton
              variant="ghost"
              size="sm"
              color={isFavorited ? "yellow.400" : ""}
              onClick={() => (isFavorited ? contactsFavoritesRemove(contact) : contactsFavoritesAdd(contact))}
            >
              <FaStar />
            </IconButton>
          )}
        </HStack>
      </Table.Cell>
      <Table.Cell>
        {callLog.recordings.length > 0 ? (
          !callLog.recordings[0].deleted ? (
            <CallRecordPlayer callLog={callLog} />
          ) : (
            <Text>{t("callLog.table_record_deleted")}</Text>
          )
        ) : null}
      </Table.Cell>
    </Table.Row>
  );
};

export default CallLogTableContent;
