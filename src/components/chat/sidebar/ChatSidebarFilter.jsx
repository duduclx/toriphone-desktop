import { Box, CloseButton, InputGroup, HStack } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

const ChatSidebarFilter = ({ searchText, setSearchText }) => {
  // requirements
  const { t } = useTranslation();

  return (
    <Box px="4" mt="4">
      <HStack>
        <InputGroup
          size="lg"
          endElement={
            <CloseButton
              size="md"
              onClick={() => {
                setSearchText("");
              }}
              me="-2"
            />
          }
        >
          <InputUi
            value={searchText}
            variant="filled"
            placeholder={t("chat.search")}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </InputGroup>
      </HStack>
    </Box>
  );
};

export default ChatSidebarFilter;
