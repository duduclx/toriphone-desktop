import { Flex, Text, Separator } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";

import RingPage from "./ring/RingPage";
import AudioPage from "./audio/AudioPage";
import CameraPage from "./camera/CameraPage";
import MicroPage from "./micro/MicroPage";
import HeaderSearch from "../../header/search/HeaderSearch";
import LangPage from "./lang/LangPage";

const UserPreferences = () => {
  // requirements
  const { t } = useTranslation();

  return (
    <Flex flex="1" flexDirection="column" justifyContent="flex-start" p="2" height="100vh" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t("preferences.title")}
        </Text>
        <HeaderSearch />
      </Flex>
      <Separator />
      <Flex
        flex={1}
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        gap={4}
        p={2}
        width="100%"
        overflowY="auto"
        className="hide-scrollbar"
      >
        <LangPage />
        <RingPage />
        <AudioPage />
        <CameraPage />
        <MicroPage />
      </Flex>
    </Flex>
  );
};

export default UserPreferences;
