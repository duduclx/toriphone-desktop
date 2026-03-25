import { useRef } from "react";
import { Avatar, Button, Dialog, HStack, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { pickPalette } from "../../../ui";
import { FaPhoneAlt, FaVideo, FaStar } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { useTranslation } from "react-i18next";

import UserStateBadge from "../../../utils/UserStateBadge";

import { useAuth } from "toriphone-auth";
import { useWazo } from "../../../services/WazoProvider";

const ChatDialerMenu = () => {
  // requirements
  const { t } = useTranslation();
  const { open, onOpen, onClose } = useDisclosure();

  // api
  const {
    chatRoom,
    usersPresence,
    chatRoomLabelGet,
    contactsFavorites,
    contactsFavoritesAdd,
    contactsFavoritesRemove,
    call,
    setAppCurrentPage,
  } = useWazo();

  // states
  let roomName;
  const initialRef = useRef(null);

  if (Object.keys(chatRoom).length === 0) {
    return null; // Si room est null ou room.users est undefined, retourner null ou un autre composant vide
  } else {
    roomName = chatRoom ? chatRoomLabelGet(chatRoom) : null;
  }

  const isFavorited = contactsFavorites.some((favorite) => favorite?.number === roomName?.number);

  return (
    <>
      <HStack justifyContent="space-between" px="4" borderBottom="1px" pb="2" borderBottomColor="borderColor">
        <Text fontSize="16px" fontWeight="bold" margin="auto">
          {chatRoom?.users.length > 2 ? chatRoom.name : roomName?.name}
        </Text>
        <HStack pr="4" alignItems="center">
          {chatRoom?.users.length == 2 && (
            <>
              <IconButton variant="ghost" onClick={() => call(roomName.number, false)}>
                <FaPhoneAlt />
              </IconButton>
              <IconButton
                variant="ghost"
                onClick={() => {
                  call(roomName.number, true);
                  setAppCurrentPage("phone");
                }}
              >
                <FaVideo />
              </IconButton>
              <IconButton
                variant="ghost"
                size="sm"
                color={isFavorited ? "yellow.400" : ""}
                onClick={() => (isFavorited ? contactsFavoritesRemove(roomName) : contactsFavoritesAdd(roomName))}
              >
                <FaStar />
              </IconButton>
            </>
          )}

          <Button onClick={onOpen} variant="ghost">
            <MdPerson fontSize="xs" />
            <Text fontSize="xs" fontWeight="bold">
              {chatRoom?.users.length}
            </Text>
          </Button>
        </HStack>
      </HStack>
      <Dialog.Root initialFocusEl={initialRef} open={open} onOpenChange={onClose}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="bgDefault">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{t("chat.options_list_participant")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              {chatRoom?.users.map((user, index) => (
                <HStack key={index} p="2">
                  <Avatar.Root colorPalette={pickPalette(usersPresence[user.uuid]?.name)}>
                    <Avatar.Fallback name={usersPresence[user.uuid]?.name} />
                    <UserStateBadge userinfo={usersPresence[user.uuid]} />
                  </Avatar.Root>
                  <Text ml="2">{usersPresence[user.uuid]?.name}</Text>
                </HStack>
              ))}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default ChatDialerMenu;
