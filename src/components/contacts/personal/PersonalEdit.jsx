import { useState, useEffect } from "react";
import { Button, Dialog, Field, Flex, Textarea } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { FaSave } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

const PersonalEdit = ({ person, open, onClose }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { contactsPersonalEdit } = useWazo();

  // value
  const [updatedPerson, setUpdatedPerson] = useState({});

  // Met à jour `updatedPerson` à chaque fois que `person` change
  useEffect(() => {
    if (person) {
      const separateName = person.separateName();
      setUpdatedPerson({
        email: person.email,
        firstName: separateName.firstName,
        lastName: separateName.lastName,
        phoneNumber: person.number,
        mobile: person.mobile,
        entreprise: person.entreprise,
        address: person.address,
        note: person.note,
        sourceId: person.sourceId,
      });
    }
  }, [person]);

  const handleInputChange = (key, value) => {
    setUpdatedPerson((prevContact) => ({
      ...prevContact,
      [key]: value,
    }));
  };

  const confirmEdit = () => {
    contactsPersonalEdit(updatedPerson);
    onClose();
  };

  return (
    <>
      {updatedPerson && (
        <Dialog.Root open={open} onOpenChange={onClose}>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content bg="bgDefault" width="600px" maxWidth="90vw">
              <Dialog.Header alignSelf="center">
                <Dialog.Title>
                  {t("contacts.personal_edit_title")} {person.name}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.CloseTrigger />
              <Dialog.Body>
                <Flex flexDirection="column" gap="2">
                  <Field.Root>
                    <Field.Label>{t("contacts.card_firstname")}</Field.Label>
                    <InputUi
                      required
                      value={updatedPerson.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>{t("contacts.card_lastname")}</Field.Label>
                    <InputUi
                      required
                      value={updatedPerson.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>{t("contacts.card_number")}</Field.Label>
                    <InputUi
                      required
                      value={updatedPerson.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>{t("contacts.card_email")}</Field.Label>
                    <InputUi value={updatedPerson.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>{t("contacts.card_enterprise")}</Field.Label>
                    <InputUi
                      value={updatedPerson.entreprise}
                      onChange={(e) => handleInputChange("entreprise", e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>{t("contacts.card_address")}</Field.Label>
                    <Textarea
                      bg="selectBg"
                      borderColor="selectBorder"
                      value={updatedPerson.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>{t("contacts.card_note")}</Field.Label>
                    <Textarea
                      bg="selectBg"
                      borderColor="selectBorder"
                      value={updatedPerson.note}
                      onChange={(e) => handleInputChange("note", e.target.value)}
                    />
                  </Field.Root>
                </Flex>
              </Dialog.Body>
              <Dialog.Footer>
                <Button colorPalette="secondary" onClick={() => confirmEdit()}>
                  <FaSave /> {t("contacts.personal_edit_button")}
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      )}
    </>
  );
};

export default PersonalEdit;
