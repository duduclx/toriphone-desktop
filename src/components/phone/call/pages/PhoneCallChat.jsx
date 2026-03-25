import { useState } from "react";
import { Box, InputGroup, IconButton, HStack, Flex, Text } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import { InputUi } from "../../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const PhoneCallChat = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { user } = useAuth();
  const { appLarge, sendChat, callChatMessages, callSession, isFullScreen, showSidebar } = useWazo();

  // states
  const [message, setMessage] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSendChat();
    }
  };

  const onSendChat = () => {
    sendChat({
      message: message,
      user: user.profile.firstName + " " + user.profile.lastName,
      uuid: user.uuid,
      call: callSession.callId,
    });
    setMessage("");
  };

  return (
    <>
      {Object.keys(callSession).length > 0 && (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignSelf="center"
          width={appLarge ? (showSidebar ? "30%" : "30%") : "40%"}
          mx="4"
          my="8"
          overflowY="hidden"
          bg="bgElevated"
          boxShadow="lg"
          p="4"
          borderRadius="14px"
          transition="width 0.5s ease"
          height={"calc(100vh - 220px)"}
        >
          <Text textAlign="center" p="1" mb="2" fontSize="lg" as="b">
            {t("phone.chat_title")}
          </Text>
          <Box
            height="calc(100vh - 350px)"
            maxHeight={isFullScreen ? "calc(100vh - 200px)" : "calc(100vh - 340px)"}
            overflowY="auto"
            flex="1"
            p="2"
          >
            {callChatMessages.map(
              (msg, index) =>
                (callSession.call?.talkingToIds.includes(msg.call) || msg.call === callSession.callId) && (
                  <Flex key={index} w="100%" flexDirection="column" flex="1">
                    <Text mt="2" alignSelf={msg.uuid === user.uuid ? "flex-end" : "flex-start"}>
                      {msg.user}
                    </Text>
                    <Flex
                      my="1"
                      p="3"
                      borderRadius="8px"
                      justifyContent={msg.uuid === user.uuid ? "flex-end" : "flex-start"}
                      bg={msg.uuid === user.uuid ? "blue.100" : "green.100"}
                    >
                      <Text color="black">{msg.message}</Text>
                    </Flex>
                  </Flex>
                )
            )}
          </Box>
          <HStack mt="4">
            <InputGroup
              endElement={
                <IconButton
                size="md"
                colorPalette="primary"
                  onClick={() => {
                    onSendChat();
                  }}
                  me="-2"
                >
                  <MdSend />
                </IconButton>
              }
            >
              <InputUi
                placeholder={t("phone.send_chat_placeholder")}
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </InputGroup>
          </HStack>
        </Flex>
      )}
    </>
  );
};

export default PhoneCallChat;
