import { IconButton, InputGroup, Flex, Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { FaPhoneAlt } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";
import { useTranslation } from "react-i18next";

const PhoneSidebarDialer = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { number, call, setNumber, setAppCurrentPage } = useWazo();

  const makeCall = () => {
    if (number) {
      setAppCurrentPage("phone");
       // Supprimer tous les espaces du numéro
      const cleanNumber = number.replaceAll(" ", "");
      call(cleanNumber, false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      makeCall(number, false);
    }
  };

  return (
    <Flex mt="4">
      <Field.Root>
        <Field.Label>{t("phone.dialer_title")} :</Field.Label>
        <InputGroup
          size="md"
          endElement={
            <IconButton
              size="md"
              variant="ghost"
              colorPalette={number ? "secondary" : "white"}
              onClick={() => makeCall(number, false)}
            >
              <FaPhoneAlt />
            </IconButton>
          }
        >
          <InputUi
            mx="1"
            type="tel"
            value={number}
            placeholder={t("phone.dialer_placeholder")}
            onChange={(e) => setNumber(e.currentTarget.value)}
            size="md"
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </InputGroup>
      </Field.Root>
    </Flex>
  );
};

export default PhoneSidebarDialer;
