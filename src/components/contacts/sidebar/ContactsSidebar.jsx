import { Flex, Text, Spacer } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PhoneSidebarCalls from "../../phone/sidebar/PhoneSidebarCalls";
import FlexSidebar from "../../sidebar/FlexSidebar";
import ContactsLinks from "./ContactsLinks";

const ContactsSidebar = () => {
  // requirements
  const { t } = useTranslation();

  return (
    <FlexSidebar>
      <Text p="2" mb="4" textAlign="center" as="b">
        {t("contacts.sidebar_title")}
      </Text>
      <PhoneSidebarCalls />
      <Flex flexDirection="column" alignItems="flex-start" mt="8">
        <ContactsLinks />
      </Flex>
      <Spacer />
    </FlexSidebar>
  );
};

export default ContactsSidebar;
