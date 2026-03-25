import { Flex, Text, Separator, Box, VStack, Heading, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import HeaderSearch from "../../header/search/HeaderSearch";
import logo from "/toriLogoApp.svg";

import { useAuth } from "toriphone-auth";

const About = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { user } = useAuth();

  return (
    <Flex flex="1" flexDirection="column" p="2" height="100vh" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t("user.about")}
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
        <Box>
          <Image alt="Toriphone logo" src={logo} />
          <VStack gap="4">
            <Heading as="h1" size="xl">
              ToriPhone Desktop
            </Heading>
            <Box display="flex">
              <Text pr="2" fontWeight="bold">
                {t("about.version")} :
              </Text>
              <Text>0.5.0</Text>
            </Box>
            <Box display="flex">
              <Text pr="2" fontWeight="bold">
                {t("about.current_server")} :
              </Text>
              <Text>{user.server}</Text>
            </Box>
            <Box display="flex">
              <Text pr="2" fontWeight="bold">
                {t("about.engine_version")} :
              </Text>
              <Text>{user.engineVersion}</Text>
            </Box>
            <Text>Copyright 2024 - 2025 ToriPhone {t("about.copyright")}</Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default About;
