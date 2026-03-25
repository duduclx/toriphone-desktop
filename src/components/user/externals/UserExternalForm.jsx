import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Box, Button, Dialog, Flex, Field, IconButton } from "@chakra-ui/react";
import { ButtonAddUi, ButtonEditUi, InputUi } from "../../../ui";
import { FaX } from "react-icons/fa6";

const UserExternalForm = ({ open, onClose, externalApp, setExternalApp, submit, errors, edit = false }) => {
  // requirements
  const { t } = useTranslation();

  // values
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

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
            <Dialog.Title>{edit ? t("externals.title_edit") : t("externals.title_add")}</Dialog.Title>
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
                <Field.Label>{t("externals.name")} :</Field.Label>
                <InputUi
                  value={externalApp.label}
                  disabled={edit}
                  onChange={(e) => setExternalApp((prev) => ({ ...prev, label: e.target.value }))}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </Field.Root>
              {externalApp.configuration && Object.keys(externalApp.configuration).length > 0 && (
                <Flex direction="column" gap="1">
                  {Object.entries(externalApp.configuration).map(([key, value]) => (
                    <Flex key={key} align="center" justify="space-between" px="2">
                      <Box maxW="90%" whiteSpace="normal" wordBreak="break-word">
                        <strong>{key}</strong>: <span>{value}</span>
                      </Box>
                      <IconButton
                        size="sm"
                        colorPalette="red"
                        onClick={() =>
                          setExternalApp((prev) => {
                            const newConfig = { ...prev.configuration };
                            delete newConfig[key];
                            return { ...prev, configuration: newConfig };
                          })
                        }
                      >
                        <FaX />
                      </IconButton>
                    </Flex>
                  ))}
                </Flex>
              )}
              <Field.Root>
                <Field.Label>{t("externals.config_key")} :</Field.Label>
                <InputUi
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  placeholder={t("externals.config_key")}
                  onKeyDown={handleKeyDown}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>{t("externals.config_value")} :</Field.Label>
                <InputUi
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder={t("externals.config_value")}
                  onKeyDown={handleKeyDown}
                />
                <Field.HelperText>{t("externals.config_helper")}</Field.HelperText>
              </Field.Root>

              <Button
                colorPalette="teal"
                disabled={!newKey || !newValue}
                onClick={() => {
                  setExternalApp((prev) => ({
                    ...prev,
                    configuration: {
                      ...(prev.configuration || {}),
                      [newKey]: newValue,
                    },
                  }));
                  setNewKey("");
                  setNewValue("");
                }}
              >
                {t("externals.add_config")}
              </Button>
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

export default UserExternalForm;
