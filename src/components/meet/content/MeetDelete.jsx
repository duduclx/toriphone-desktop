import { Dialog, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { ButtonDeleteUi } from "../../../ui";
import { useWazo } from "../../../services/WazoProvider";

const MeetDelete = ({ open, onClose, meeting }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { meetingDelete } = useWazo();

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="bgDefault">
          <Dialog.Header alignSelf="center">
            <Dialog.Title>{t("meetings.delete_title")} : {meeting.name}</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            <Text>{t("meetings.delete_confirm")} {meeting.name} ?</Text>
          </Dialog.Body>
          <Dialog.Footer>
            <ButtonDeleteUi onClick={() => meetingDelete(meeting)} />
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default MeetDelete;
