import { useRef, useEffect, useState } from "react";
import { Field, InputGroup, IconButton, Flex, Box } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { MdSend } from "react-icons/md";

import { useWazo } from "../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const ChatDialerForm = () => {
  // api
  const { user } = useAuth();
  const { chatRoom, chatRoomMessageSend } = useWazo();

  // states
  const [chatMessage, setChatMessage] = useState({
    alias: user.profile.firstName + " " + user.profile.lastName,
    content: "",
  });

  // resources
  const inputRef = useRef(null);

  // submit
  const submit = async () => {
    chatRoomMessageSend(chatRoom, chatMessage);
    setChatMessage((prev) => ({ ...prev, content: "" }));
  };

  const onClick = (EmojiData) => {
    chatRoomMessageSend((message) => message + EmojiData.emoji);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatRoom]);

  return (
    <Box px="12" py="4">
      <InputGroup
        endElement={
          <IconButton variant="ghost" colorPalette="primary" onClick={() => submit()}>
            <MdSend />
          </IconButton>
        }
      >
        <InputUi
          ref={inputRef}
          value={chatMessage.content}
          onChange={(e) => setChatMessage((prev) => ({ ...prev, content: e.target.value }))}
          
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </InputGroup>
    </Box>
  );
};

export default ChatDialerForm;
