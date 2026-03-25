import { Flex, Separator, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import UserStatus from "./UserStatus";

const UserProfil = () => {
  // requirements
  const { t } = useTranslation();

  return (
    <Flex flex="1" flexDirection="column" justifyContent="flex-start" alignItems="center" gap="4" p="4">
      <Text p="2" as="b" fontSize="3xl">
        {t("profile.title")}
      </Text>
      <Separator />
      <Flex flex="1" flexDirection="column" justifyContent="center" alignItems="center">
        <UserStatus />
      </Flex>
    </Flex>
  );
};

export default UserProfil;
