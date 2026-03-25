import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import logo from "/toriLogoApp.svg";

const AppLoader = () => {
  // requirements
  const { t } = useTranslation();

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh" flexDirection="column" bg="bgDefault">
      <Image alt="logo" src={logo} />
      <Spinner colorPalette="green" size="xl" label="loading" />
      <Text mt="4">{t("app.loader")}</Text>
    </Flex>
  );
};

export default AppLoader;
