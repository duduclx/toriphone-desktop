import { useTranslation } from "react-i18next";
import { Alert, Dialog, Field, Flex } from "@chakra-ui/react";
import { ButtonAddUi, ButtonEditUi, InputUi } from "../../../ui";

const UserBlocklistForm = ({ open, onClose, blocklistNumber, setBlocklistNumber, submit, errors, edit = false }) => {
  // requirements
  const { t } = useTranslation();

  // submit on key down
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="bgDefault">
          <Dialog.Header alignSelf="center">
            <Dialog.Title>{edit ? t("blocklist.title_edit") : t("blocklist.title_add")}</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            {errors && (
              <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>{t("common.error")}</Alert.Title>
                <Alert.Description>{errors}</Alert.Description>
              </Alert.Root>
            )}
            <Flex flexDirection="column" gap="4">
              <Field.Root>
                <Field.Label>{t("blocklist.name")} :</Field.Label>
                <InputUi
                  value={blocklistNumber.label}
                  onChange={(e) => setBlocklistNumber((prev) => ({ ...prev, label: e.target.value }))}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>{t("blocklist.number")} :</Field.Label>
                <InputUi
                  value={blocklistNumber.number}
                  onChange={(e) => setBlocklistNumber((prev) => ({ ...prev, number: e.target.value }))}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <Field.HelperText>{t("blocklist.helper")}</Field.HelperText>
              </Field.Root>
            </Flex>
          </Dialog.Body>
          <Dialog.Footer>
            {edit ? (
              <ButtonEditUi onClick={() => submit()} />
            ) : (
              <ButtonAddUi onClick={() => submit()} />
            )}
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default UserBlocklistForm;
