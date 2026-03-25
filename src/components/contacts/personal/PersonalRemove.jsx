import { Button, Dialog, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

const PersonalRemove = ({ person, open, onClose }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { contactsPersonalRemove } = useWazo();

  const confirmRemove = () => {
    onClose();
    contactsPersonalRemove(person);
  };

  return (
      <Dialog.Root open={open} onOpenChange={onClose}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="bgDefault">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{person.name}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Text>
                {t("contacts.personal_delete")}{" "}
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{person.name}</span> ?
              </Text>
            </Dialog.Body>

            <Dialog.Footer>
              <Button colorPalette="danger" mr="3" onClick={onClose}>
                {t("contacts.personal_delete_cancel")}
              </Button>
              <Button colorPalette="secondary" onClick={() => confirmRemove()}>
                {t("contacts.personal_delete_confirm")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
  );
};

export default PersonalRemove;
