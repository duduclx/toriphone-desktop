import { useState, useRef, useEffect } from "react";
import { Box, Button, Field, Flex, InputGroup, Separator, Text } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";
import HeaderSearch from "../../header/search/HeaderSearch";

const UserFax = ({ number }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { faxSend } = useWazo();

  // states
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

  const handleUploadButtonClick = () => {
    // Déclencher le clic sur l'input de type fichier lorsque le bouton de téléchargement est cliqué
    fileInputRef.current.click();
  };

  const handleSendFax = async () => {
    // Vérifiez si un fichier est sélectionné
    if (selectedFile) {
      const formData = new FormData();
      formData.append("fax", selectedFile);
      const res = await faxSend(extension, formData);
      if(res.error) {
        toaster.create({
          type: "error",
          title: t("fax.error_title"),
          description: t("fax.error_description"),
          duration: 3000,
          closable: true
        })
      } else {
        toaster.create({
          type: "success",
          title: t("fax.success_title"),
          description: t("fax.success_description"),
          duration: 3000,
          closable: true
        });
      }
    } else {
      // console.error("Aucun fichier sélectionné");
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
    <Flex flex="1" flexDirection="column" p="2" height="100vh" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t("fax.title")}
        </Text>
        <HeaderSearch />
      </Flex>
      <Separator />
      <Flex
        flex="1"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        overflowY="auto"
        className="hide-scrollbar"
      >
        <Field.Root mt="4" width="50%">
          <Field.Label htmlFor="file">{t("fax.file")} :</Field.Label>
          <Box display="flex" justifyContent="space-between" gap="4">
              <InputUi id="file" type="file" opacity="0" position="absolute" zIndex="-1" onChange={handleFileChange} />
              <Button colorPalette="secondary" as="label" htmlFor="file" textAlign="center">
                {t("common.browse")}
              </Button>
              <InputUi readOnly value={selectedFile ? selectedFile.name : ""} width="60%" />
            </Box>
        </Field.Root>
        <Field.Root mt="4" width="50%">
          <Field.Label>{t("fax.number")} :</Field.Label>
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
        <Button my="2" colorPalette="primary" disabled={isButtonDisabled} onClick={() => handleSendFax()}>
          {t("fax.button")}
        </Button>
      </Flex>
    </Flex>
  );
};

export default UserFax;
