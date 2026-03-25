import { useState } from "react";
import { Flex, Separator, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import HeaderSearch from "../../header/search/HeaderSearch";
import UserWebhookList from "./UserWebhookList";
import UserWebhookLog from "./UserWebhookLog";

const UserWebhooks = () => {
  // requirements
  const { t } = useTranslation();

  // page
  const [webhooksPage, setWebhooksPage] = useState("webhooksList");


  return (
    <Flex flex="1" flexDirection="column" justifyContent="flex-start" p="2" height="100vh" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t("webhooks.title")}
        </Text>
        <HeaderSearch />
      </Flex>
      <Separator />
      {webhooksPage === "webhooksList" ? (
        <UserWebhookList setWebhooksPage={setWebhooksPage} />
      ) : (
        <UserWebhookLog setWebhooksPage={setWebhooksPage} />
      )}
    </Flex>
  );
};

export default UserWebhooks;
