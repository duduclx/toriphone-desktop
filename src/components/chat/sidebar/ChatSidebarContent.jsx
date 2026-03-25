import { Accordion, Box, Flex, IconButton, useDisclosure, Text } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

// il existe un badge dans le dossier userState, utilisé pour les contacts internes
import UserStateBadge from "../../../utils/UserStateBadge";
import BadgeNotification from "../../../utils/BadgeNotification";
import { useWazo } from "../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

import { useTranslation } from "react-i18next";

import ChatSidebarAddChat from "./ChatSidebarAddChat";
import ChatSidebarAddGroup from "./ChatSidebarAddGroup";

const ChatSidebarContent = ({ filteredRooms }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { user } = useAuth();
  const { chatRoomMessagesGet, chatRoom, chatMessageUnread, chatRoomLabelGet, setAppCurrentPage } = useWazo();

  // Modal add Chat
  const { open: isOpenFirstModal, onOpen: onOpenFirstModal, onClose: onCloseFirstModal } = useDisclosure();

  // Modal add Group
  const { open: isOpenSecondModal, onOpen: onOpenSecondModal, onClose: onCloseSecondModal } = useDisclosure();

  // différence enter discussion et discussion de groupe
  const roomsWithTwoUsers = filteredRooms.filter((chatRoom) => chatRoom.users.length === 2);
  const roomsWithMoreThanTwoUsers = filteredRooms.filter((chatRoom) => chatRoom.users.length > 2);

  const isCurrentRoom = (currentRoom) => {
    return currentRoom.uuid === chatRoom?.uuid;
  };

  return (
    <Flex w="100%" flexDirection="column" overflowY="auto" className="hide-scrollbar" mt="4">
      <Accordion.Root multiple collapsible>
        <Accordion.Item className="custom-accordion-container" value="a">
          <h2 style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Accordion.ItemTrigger>
              <Accordion.ItemIndicator />
              <Box as="span" flex="1" textAlign="center">
                {t("chat.menu_my_chats")}
              </Box>
            </Accordion.ItemTrigger>
            <IconButton
              ml="2"
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                onOpenFirstModal();
              }}
            >
              <MdAdd />
            </IconButton>
          </h2>
          <Accordion.ItemContent pb="4">
            {roomsWithTwoUsers.map((room, index) => {
              const chatdcontact = chatRoomLabelGet(room);
              const isHighlighted = isCurrentRoom(room);
              const isLast = room.last?.user_uuid == user.uuid;
              const unreadCount = chatMessageUnread[room.uuid] || 0;
              return (
                <Box key={index} position="relative" my="4" ml="4">
                  {chatdcontact && <UserStateBadge userinfo={chatdcontact} />}
                  <Box bgColor={isHighlighted ? "blue.300" : "bgElevated"} borderRadius="8px" mb="2" padding="1px">
                    {unreadCount > 0 && <BadgeNotification>{unreadCount}</BadgeNotification>}
                    <Box
                      variant="link"
                      m="2"
                      pb="2"
                      onClick={() => {
                        setAppCurrentPage("chat");
                        chatRoomMessagesGet(room);
                      }}
                    >
                      <Flex flexDirection="column" gap="2">
                        <Text>{chatdcontact?.name || t("chat.unkown")}</Text>
                        <Text as="sub">
                          {room.last && (isLast ? t("chat.you") : `${chatdcontact?.separateName().firstName} : `)}
                          {room.last?.content && room.last?.content.length > 30
                            ? `${room.last?.content.substring(0, 30)}...`
                            : room.last?.content}
                        </Text>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item className="custom-accordion-container" value="b">
          <h2 style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Accordion.ItemTrigger>
              <Accordion.ItemIndicator />
              <Box as="span" flex="1" textAlign="center">
                {t("chat.menu_my_chats_group")}
              </Box>
            </Accordion.ItemTrigger>
            <IconButton
              ml="2"
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                onOpenSecondModal();
              }}
            >
              <MdAdd />
            </IconButton>
          </h2>
          <Accordion.ItemContent pb="4">
            {roomsWithMoreThanTwoUsers.map((room, index) => {
              const isHighlighted = isCurrentRoom(room);
              const chatdcontact = chatRoomLabelGet(room);
              const isLast = room.last?.user_uuid == user.uuid;
              const unreadCount = chatMessageUnread[room.uuid] || 0;
              return (
                <Box
                  key={index}
                  bgColor={isHighlighted ? "blue.300" : "bgElevated"}
                  borderRadius="8px"
                  mb="2"
                  padding="1px"
                  ml="4"
                >
                  {unreadCount > 0 && <BadgeNotification>{unreadCount}</BadgeNotification>}
                  <Box
                    variant="link"
                    m="2"
                    pb="2"
                    onClick={() => {
                      setAppCurrentPage("chat");
                      chatRoomMessagesGet(room);
                    }}
                  >
                    <Flex flexDirection="column" gap="2">
                      <Text>{room.name}</Text>
                      <Text as="sub">
                        {room.last && (isLast ? "vous : " : `${chatdcontact?.separateName().firstName} : `)}
                        {room.last?.content && room.last?.content.length > 30
                          ? `${room.last?.content.substring(0, 30)}...`
                          : room.last?.content}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              );
            })}
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
      <ChatSidebarAddChat isOpenFirstModal={isOpenFirstModal} onCloseFirstModal={onCloseFirstModal} />
      <ChatSidebarAddGroup isOpenSecondModal={isOpenSecondModal} onCloseSecondModal={onCloseSecondModal} />
    </Flex>
  );
};

export default ChatSidebarContent;
