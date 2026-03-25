import { Spacer, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PhoneSidebarCalls from "../../phone/sidebar/PhoneSidebarCalls";
import FlexSidebar from "../../sidebar/FlexSidebar";

import UserInfos from "./UserInfos";
import UserLinks from "./UserLinks";

const UserSidebar = () => {
  // requirements
  const { t } = useTranslation();

  return (
    <FlexSidebar>
      <Text p="2" mb="4" textAlign="center" as="b">
        {t("user.sidebar_title")}
      </Text>
      <PhoneSidebarCalls />
      <UserInfos />
      <Spacer />
      <UserLinks />
    </FlexSidebar>
  );
};

export default UserSidebar;
