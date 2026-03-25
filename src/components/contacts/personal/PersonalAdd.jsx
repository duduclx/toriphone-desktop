import { useState } from "react";
import { Dialog, Field, Flex, Textarea, useDisclosure } from "@chakra-ui/react";
import { ButtonAddUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";
import Errors from "../../errors/Errors";

const PersonalAdd = () => {
  // requirements
  const { t } = useTranslation();
  const { open, onOpen, onClose } = useDisclosure();

  // api
  const { contactsPersonalAdd } = useWazo();

  // errors
  const [errors, setErrors] = useState(null);

  // resource
  const [newContact, setNewContact] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    entreprise: "",
    address: "",
    note: "",
  });

  const handleInputChange = (key, value) => {
    setNewContact((prevContact) => ({
      ...prevContact,
      [key]: value,
    }));
  };

  const handleAddContact = async () => {
    const res = await contactsPersonalAdd(newContact);
    if (res.error) {
      res.status == "409"
        ? setErrors({
            title: t("contacts.personal_error_duplicate_title"),
            description: t("contacts.personal_error_duplicate_description"),
          })
        : setErrors({
            title: t("contacts.personal_error_title"),
            description: t("contacts.personal_error_description"),
          });
    } else {
      onClose();
      setNewContact({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        entreprise: "",
        address: "",
        note: "",
      });
    }
  };

  return (
    <>
      <ButtonAddUi onClick={onOpen} />

      <Dialog.Root open={open} onOpenChange={onClose}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="bgDefault">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{t("contacts.personal_add_title")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Flex flexDirection="column" gap="2">
                <Errors errors={errors} setErrors={setErrors} />
                <Flex justifyContent="space-between" gap="4">
                  <Field.Root>
                    <Field.Label>{t("contacts.card_firstname")}</Field.Label>
                    <InputUi
                      required
                      value={newContact.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>{t("contacts.card_lastname")}</Field.Label>
                    <InputUi
                      required
                      value={newContact.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </Field.Root>
                </Flex>
                <Flex justifyContent="space-between" gap="4">
                  <Field.Root>
                    <Field.Label>{t("contacts.card_number")}</Field.Label>
                    <InputUi
                      required
                      value={newContact.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>{t("contacts.card_email")}</Field.Label>
                    <InputUi value={newContact.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                  </Field.Root>
                </Flex>
                <Field.Root>
                  <Field.Label>{t("contacts.card_enterprise")}</Field.Label>
                  <InputUi
                    value={newContact.entreprise}
                    onChange={(e) => handleInputChange("entreprise", e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>{t("contacts.card_address")}</Field.Label>
                  <Textarea
                    bg="selectBg"
                    borderColor="selectBorder"
                    value={newContact.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>{t("contacts.card_note")}</Field.Label>
                  <Textarea
                    bg="selectBg"
                    borderColor="selectBorder"
                    value={newContact.note}
                    onChange={(e) => handleInputChange("note", e.target.value)}
                  />
                </Field.Root>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <ButtonAddUi onClick={handleAddContact} />
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default PersonalAdd;
