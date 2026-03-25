import { Alert, Dialog, Field, Flex, Portal } from "@chakra-ui/react";
import { ButtonAddUi, ButtonEditUi, CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import FunckeysForm from "../../../helpers/funckeys/FunckeysForm";

const UserfunckeyForm = ({
  open,
  onClose,
  funckeyPosition,
  setFunckeyPosition,
  funckey,
  setFunckey,
  submit,
  errors,
  edit = false,
}) => {
  // requirements
  const { t } = useTranslation();

  // edit position
  const positionEdit = (value) => {
    if (value) {
      setFunckeyPosition(value);
    } else {
      setFunckeyPosition("");
    }
  };

  // submit on key down
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Backdrop />
      <Portal>
        <Dialog.Positioner>
          <Dialog.Content bg="bgDefault">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{edit ? t("funckeys.title_edit") : t("funckeys.title_add")}</Dialog.Title>
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
                  <Field.Label>{t("funckeys.position")} :</Field.Label>
                  <InputUi
                    disabled={edit}
                    value={funckeyPosition}
                    onChange={(e) => positionEdit(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                  <Field.HelperText>
                    {edit ? t("funckeys.position_helper_edit") : t("funckeys.position_helper_add")}
                  </Field.HelperText>
                </Field.Root>
                <Field.Root>
                  <Field.Label>{t("funckeys.label")} :</Field.Label>
                  <InputUi
                    value={funckey.label || ""}
                    onChange={(e) => setFunckey((prev) => ({ ...prev, label: e.target.value }))}
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>{t("funckeys.destination")} :</Field.Label>
                  <FunckeysForm funckey={funckey} setFunckey={setFunckey}/>
                </Field.Root>
                <Field.Root>
                  <CheckboxUi
                    checked={funckey.blf}
                    onCheckedChange={(e) => setFunckey((prev) => ({ ...prev, blf: e.checked }))}
                  >{t("funckeys.blf")}</CheckboxUi>
                </Field.Root>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              {edit ? <ButtonEditUi onClick={() => submit()} /> : <ButtonAddUi onClick={() => submit()} />}
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default UserfunckeyForm;
