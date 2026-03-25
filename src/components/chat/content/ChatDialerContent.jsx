import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { Text, HStack, Flex, Avatar, Box } from "@chakra-ui/react";
import { pickPalette } from "../../../ui";
import { useWazo } from "../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const ChatDialerContent = () => {
  // api
  const { chatMessages, usersPresence } = useWazo();
  const { user } = useAuth();

  // states
  const [formattedDates, setFormattedDates] = useState([]);

  // auto-scroll to bottom
  const useChatScroll = () => {
    const ref = useRef();
    useLayoutEffect(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, [chatMessages]);
    return ref;
  };

  const ref = useChatScroll();

  // date format util
  const formatDateToDDMM = (date) => {
    const today = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const monthIndex = date.getMonth();
    const months = ["janv.", "fevr.", "mars", "avril", "mai", "juin", "juil.", "aout", "sept.", "oct.", "nov.", "dec."];
    const month = months[monthIndex];
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "aujourd'hui";
    } else {
      return `${day} ${month}`;
    }
  };

  // met à jour les dates affichées toutes les minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedDates(chatMessages.map((message) => formatDateToDDMM(message.date)));
    }, 60 * 1000);
    setFormattedDates(chatMessages.map((message) => formatDateToDDMM(message.date)));

    return () => clearInterval(intervalId);
  }, [chatMessages]);

  if (!chatMessages) {
    return null;
  }

  // 🔹 Regrouper les messages consécutifs d’un même utilisateur
  const groupedMessages = [];
  chatMessages.forEach((msg) => {
    const lastGroup = groupedMessages[groupedMessages.length - 1];
    if (lastGroup && lastGroup.userUuid === msg.userUuid) {
      lastGroup.messages.push(msg);
    } else {
      groupedMessages.push({ userUuid: msg.userUuid, messages: [msg] });
    }
  });

  return (
    <Flex
      flexDirection="column"
      p="4"
      height="calc(100vh - 240px)"
      overflowY="auto"
      ref={ref}
      gap="4"
      justifyContent="flex-start"
      className="hide-scrollbar"
      mx="8"
    >
      {groupedMessages.map((group, groupIndex) => {
        const groupUser = usersPresence[group.userUuid];
        const isCurrentUser = group.userUuid === user.uuid;
        const firstMessage = group.messages[0];
        const formattedDate =
          formattedDates[groupIndex] +
          " " +
          firstMessage.date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          });

        return (
          <Flex key={groupIndex} flexDirection="column" alignItems="flex-start">
            {/* Avatar + Nom + Date */}
            <HStack alignSelf="flex-start" mb="1" spacing="2">
              <Avatar.Root colorPalette={pickPalette(groupUser?.name)}>
                <Avatar.Fallback name={groupUser?.name} />
              </Avatar.Root>
              <Text fontWeight="medium">{groupUser?.name}</Text>
              <Text as="sub" color="gray.500">
                {formattedDate}
              </Text>
            </HStack>

            {/* Messages du groupe */}
            <Flex flexDirection="column" gap="1" alignItems="flex-start">
              <Box p="2" borderRadius="8px" bg={isCurrentUser ? "blue.100" : "green.100"}>
                <Text textAlign="left" color="black" whiteSpace="pre-wrap" wordBreak="break-word">
                  {group.messages.map((m) => m.content).join("\n")}
                </Text>
              </Box>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default ChatDialerContent;
