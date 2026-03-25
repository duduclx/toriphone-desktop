import { useRef, useState } from "react";
import { Dialog, Field, Portal } from "@chakra-ui/react";
import { ButtonAddUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";
import ComboboxAsyncUsers from "./ComboboxAsyncUsers";

const ChatSidebarAddGroup = ({ isOpenSecondModal, onCloseSecondModal }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { user } = useAuth();

  // states
  const [roomName, setRoomName] = useState("");
  const [roomUsersUuid, setRoomUsersUuid] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const initialRef = useRef(null);
  const { chatRoomCreate, chatRoomMessagesGet, chatRoomUserSearch } = useWazo();

  const onclickCreateGroup = async () => {
    if (roomName) {
      const chatRoom = await chatRoomCreate(roomName, roomUsersUuid);
      await chatRoomMessagesGet(chatRoom);
      setRoomName("");
      setRoomUsersUuid([]);
      onCloseSecondModal();
    }
  };

  return (
    <Dialog.Root initialFocusEl={initialRef} open={isOpenSecondModal} onOpenChange={onCloseSecondModal}>
      <Dialog.Backdrop />
      <Portal>
        <Dialog.Positioner>
          <Dialog.Content bg="bgDefault">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{t("chat.menu_add_group")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Field.Root>
                <Field.Label>{t("chat.menu_add_title")} :</Field.Label>
                <InputUi
                  placeholder={t("chat.menu_add_title")}
                  required
                  invalid={!roomName}
                  onChange={(text) => setRoomName(text.target.value)}
                />
              </Field.Root>
              <Field.Root mt="4">
                <Field.Label>{t("chat.menu_add_with")} :</Field.Label>
                <ComboboxAsyncUsers chatRoomUserSearch={chatRoomUserSearch} setRoomUsersUuid={setRoomUsersUuid} user={user} />
              </Field.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <ButtonAddUi onClick={() => onclickCreateGroup()} />
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ChatSidebarAddGroup;
