import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import ChatSidebarContent from "./ChatSidebarContent";
import ChatSidebarFilter from "./ChatSidebarFilter";
import PhoneSidebarCalls from "../../phone/sidebar/PhoneSidebarCalls";

import { useWazo } from "../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

import FlexSidebar from "../../sidebar/FlexSidebar";

const ChatSidebar = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { user } = useAuth();
  const { appLarge, chatRoomsWithLastMessage, usersPresence } = useWazo();

  // filter
  const [searchText, setSearchText] = useState("");

  const filteredRooms = chatRoomsWithLastMessage.filter((room) => {
    const matchingUsers = room.users.filter((person) => {
      if (person.uuid !== user.uuid) {
        const userName = usersPresence[person.uuid]?.name;
        return userName && userName.toLowerCase().includes(searchText.toLowerCase());
      }
    });

    return room.name.toLowerCase().includes(searchText.toLowerCase()) || matchingUsers.length > 0;
  });

  return appLarge ? (
    <FlexSidebar>
      <Text p="2" textAlign="center" as="b" mb="4">
        {t("chat.sidebar_title")}
      </Text>
      <PhoneSidebarCalls />
      <ChatSidebarFilter searchText={searchText} setSearchText={setSearchText} />
      <ChatSidebarContent filteredRooms={filteredRooms} />
    </FlexSidebar>
  ) : (
    <>
      <ChatSidebarFilter searchText={searchText} setSearchText={setSearchText} />
      <ChatSidebarContent filteredRooms={filteredRooms} />
    </>
  );
};

export default ChatSidebar;
