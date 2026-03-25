import { Flex, HStack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LocaleSwitcher } from "../../../../utils/LanguageSwitcher";

const LangPage = () => {
  // requirements
  const { t } = useTranslation();

  return (
    <Flex flex={1} flexDirection="column" justifyContent="flex-start" gap="2" p="2" width="90%">
        <Text py="2" whiteSpace="nowrap" textAlign="center" fontSize="xl" fontWeight="bold">
          {t("preferences.lang.title")}
        </Text>
      <HStack justifyContent="space-between" width="100%">
        <Text width="30%">{t("preferences.lang.select")} :</Text>
        <LocaleSwitcher />
      </HStack>
    </Flex>
  );
};

export default LangPage;
