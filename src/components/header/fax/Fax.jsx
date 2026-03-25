import { useState, useRef, useEffect } from "react";
import { Button, Dialog, Field, InputGroup } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

const Fax = ({ faxRef, isOpenFax, onCloseFax, number }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { faxSend } = useWazo();

  const [selectedFile, setSelectedFile] = useState(null);
  const [extension, setExtension] = useState(number || "");
  const [isValidExtension, setIsValidExtension] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    isValidForm(file, isValidExtension);
  };

  const handleExtensionChange = (event) => {
    const enteredExtension = event.target.value;
    setExtension(enteredExtension);
  };

  useEffect(() => {
    const phoneRegex = /^[0-9]+$/;
    setIsValidExtension(phoneRegex.test(extension) && extension.length >= 10);
    isValidForm(selectedFile, phoneRegex.test(extension) && extension.length >= 10);
  }, [extension]);

  const handleSendFax = async () => {
    // Vérifiez si un fichier est sélectionné
    if (selectedFile) {
      const formData = new FormData();
      formData.append("fax", selectedFile);
      const promise = await faxSend(extension, formData);
      toaster.create(promise);
    }
  };

  const isValidForm = (file, extension) => {
    if (file && extension) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  return (
    <Dialog.Root initialFocusEl={faxRef} open={isOpenFax} onOpenChange={onCloseFax}>
      <Dialog.Backdrop />
      <Dialog.Content bg="bgDefault">
        <Dialog.Header alignSelf="center">
          <Dialog.Title>{t("fax.title")}</Dialog.Title>
        </Dialog.Header>
        <Dialog.CloseTrigger />
        <Dialog.Body>
          <Field.Root mt="4">
            <Field.Label htmlFor="fileInput">{t("fax.file")}</Field.Label>
            <InputGroup
            >
              <InputUi
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                css={{ display: "none" }}
                onChange={handleFileChange}
              />
              <InputUi
                placeholder={t("fax.file_placeholder")}
                mb="4"
                readOnly
                value={selectedFile ? selectedFile.name : ""}
              />
            </InputGroup>
          </Field.Root>
          <Field.Root mt="4">
            <Field.Label>{t("fax.number")}</Field.Label>
            <InputGroup>
              <InputUi
                value={extension}
                onChange={(event) => handleExtensionChange(event)}
                placeholder={t("fax.number_placeholder")}
                invalid={!isValidExtension}
                errorBorderColor="red.300"
                mb="4"
              />
            </InputGroup>
          </Field.Root>
        </Dialog.Body>
        <Dialog.Footer>
          <Button my="2" disabled={isButtonDisabled} onClick={() => handleSendFax()}>
            {t("fax.button")}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Fax;
