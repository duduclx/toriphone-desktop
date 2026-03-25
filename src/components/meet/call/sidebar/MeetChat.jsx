import { useState, useRef, useEffect } from "react";
import { Box, Flex, IconButton, InputGroup, Text } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import { useTranslation } from "react-i18next";

import { InputUi } from "../../../../ui";
import { useAuth } from "toriphone-auth";
import { useWazo } from "../../../../services/WazoProvider";

const MeetChat = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { user } = useAuth();
  const { meetingRoom, callChatMessages, setCallChatMessages } = useWazo();

  // values
  const [message, setMessage] = useState("");

  // ref
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [callChatMessages]);

  // submit
  const sendMessage = () => {
    const newMessage = {
      message: message,
      user: user.profile.firstName + " " + user.profile.lastName,
      uuid: user.uuid,
      call: meetingRoom.callId,
    };
    meetingRoom.sendChat(newMessage);
    setCallChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && message.trim() !== "") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Flex flexDirection="column" gap="4" alignItems="center" width="100%">
      <Box width="100%" textAlign="center" my="4">
        <Text p="2" fontSize="2xl" fontWeight="bold" truncate>
          {t("meetings.chat_title")}
        </Text>
      </Box>
      <Flex
        flexDirection="column"
        width="100%"
        gap="2"
        p="2"
        overflowY="auto"
        height={"calc(100vh - 320px)"}
        className="hide-scrollbar"
      >
        {callChatMessages
          .filter((msg) => meetingRoom.participants.some((p) => p.callId === msg.call))
          .map((msg, index) => (
            <Flex flexDirection="column" alignItems="flex-start">
              <Text fontWeight="medium" alignSelf={msg.uuid === user.uuid ? "flex-end" : "flex-start"}>
                {msg.user}
              </Text>
              <Box
                key={index}
                alignSelf={msg.uuid === user.uuid ? "flex-end" : "flex-start"}
                bg={msg.uuid === user.uuid ? "blue.100" : "green.100"}
                px="3"
                py="2"
                borderRadius="12px"
                maxWidth="80%"
              >
                <Text color="black" whiteSpace="pre-wrap" wordBreak="break-word">
                  {msg.message}
                </Text>
              </Box>
            </Flex>
          ))}
        <div ref={messagesEndRef} />
      </Flex>
      <Box width="100%">
        <InputGroup
          endElement={
            <IconButton variant="ghost" colorPalette="primary" onClick={() => sendMessage()}>
              <MdSend />
            </IconButton>
          }
        >
          <InputUi value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
        </InputGroup>
      </Box>
    </Flex>
  );
};

export default MeetChat;
