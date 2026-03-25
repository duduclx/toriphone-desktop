import { useRef, useState } from "react";
import { Dialog, Field, Portal } from "@chakra-ui/react";
import { ButtonAddUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";
import ComboboxAsyncUser from "./ComboboxAsyncUser";

const ChatSidebarAddChat = ({ isOpenFirstModal, onCloseFirstModal }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { user } = useAuth();
  const { chatRoomCreate, chatRoomMessagesGet, chatRoomUserSearch } = useWazo();

  // values
  const [roomName, setRoomName] = useState("");
  const [roomUsersUuid, setRoomUsersUuid] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const initialRef = useRef(null);

  // submit
  const onclickCreateChat = async () => {
    const chatRoom = await chatRoomCreate(roomName, roomUsersUuid);
    await chatRoomMessagesGet(chatRoom);
    setRoomName("");
    setRoomUsersUuid([]);
    onCloseFirstModal();
  };

  return (
    <Dialog.Root
      initialFocusEl={initialRef}
      open={isOpenFirstModal}
      onOpenChange={onCloseFirstModal}
      scrollBehavior="inside"
    >
      <Dialog.Backdrop />
      <Portal>
        <Dialog.Positioner>
          <Dialog.Content bg="bgSecondary">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{t("chat.menu_add_chat")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Field.Root>
                <Field.Label>{t("chat.menu_add_with")} :</Field.Label>
                <ComboboxAsyncUser
                  chatRoomUserSearch={chatRoomUserSearch}
                  setRoomUsersUuid={setRoomUsersUuid}
                  user={user}
                />
              </Field.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <ButtonAddUi onClick={() => onclickCreateChat()} />
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ChatSidebarAddChat;
