import { useTranslation } from "react-i18next";
import { Flex, Box } from "@chakra-ui/react";
import { NativeSelectUi } from "../ui";

const locales = [
  { value: "en", label: "English", lc: "GB" },
  { value: "fr", label: "Français", lc: "FR" },
  { value: "es", label: "Español", lc: "ES" },
  { value: "it", label: "Italiano", lc: "IT" },
  { value: "de", label: "Deutsch", lc: "DE" },
];

export const LocaleSwitcher = () => {
  // requirements
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Flex align="center" flex="1" mb="4">
      <Box width="100%">
        <NativeSelectUi value={i18n.resolvedLanguage} onChange={(e) => handleChange(e)}>
          {locales.map((locale, index) => (
            <option key={index} value={locale.value}>
              {locale.label}
            </option>
          ))}
        </NativeSelectUi>
      </Box>
    </Flex>
  );
};
