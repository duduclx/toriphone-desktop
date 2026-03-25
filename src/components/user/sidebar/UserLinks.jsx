import { Flex, Spacer } from "@chakra-ui/react";
import { FaShieldAlt, FaSignOutAlt, FaCog, FaFax, FaRegQuestionCircle, FaPhoneSlash, FaBezierCurve, FaShapes } from "react-icons/fa";
import { MdPhoneForwarded, MdDialpad } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { ButtonMenuUi } from "../../../ui";

import { useWazo } from "../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

import UserTheme from "../theme/UserTheme";
import UserNotification from "../notification/UserNotification";

const UserLinks = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { userLogout, user, storageSessionRemove } = useAuth();
  const { configSubscription, appUserComponent, setAppUserComponent, setAppCurrentPage } = useWazo();

  const submitLogOut = async () => {
    await userLogout(user.token);
    await storageSessionRemove();
    // refresh window
    // window.location.reload();
  }

  return (
    <>
      <Flex flexDirection="column" alignItems="flex-start" width="100%">
        {/*
        <Button
            variant="ghost"
            my={1}
            w="100%"
            justifyContent="flex-start"
            leftIcon={<FaUser />}
            onClick={() => {
                setAppCurrentPage("user");
                setAppUserComponent("profile")}}
            backgroundColor={selectedComponent === "profile" ? "var(--chakra-colors-whiteAlpha-200)" : "transparent"}
          >
            {t('user.profile')}
          </Button>
          */}
        <ButtonMenuUi
          isActive={appUserComponent === "password"}
          onClick={() => {
            setAppCurrentPage("user");
            setAppUserComponent("password");
          }}
        >
          <FaShieldAlt /> {t("user.password")}
        </ButtonMenuUi>
        <ButtonMenuUi
          isActive={appUserComponent === "renvois"}
          onClick={() => {
            setAppCurrentPage("user");
            setAppUserComponent("renvois");
          }}
        >
          <MdPhoneForwarded /> {t("user.forwards")}
        </ButtonMenuUi>
        <ButtonMenuUi
          isActive={appUserComponent === "blocklist"}
          onClick={() => {
            setAppCurrentPage("user");
            setAppUserComponent("blocklist");
          }}
        >
          <FaPhoneSlash /> {t("user.blocklist")}
        </ButtonMenuUi>
        {/*
        <ButtonMenuUi
          isActive={appUserComponent === "funckeys"}
          onClick={() => {
            setAppCurrentPage("user");
            setAppUserComponent("funckeys");
          }}
        >
          <MdDialpad /> {t("user.funckeys")}
        </ButtonMenuUi>
        */}
        <ButtonMenuUi
          isActive={appUserComponent === "fax"}
          onClick={() => {
            setAppCurrentPage("user");
            setAppUserComponent("fax");
          }}
        >
          <FaFax /> {t("user.fax")}
        </ButtonMenuUi>
        <ButtonMenuUi
          isActive={appUserComponent === "preferences"}
          onClick={() => {
            setAppCurrentPage("user");
            setAppUserComponent("preferences");
          }}
        >
          <FaCog /> {t("user.preferences")}
        </ButtonMenuUi>
        {
        (!configSubscription.configuration.subscription || user.profile.subscriptionType >= 7 )&& (
          <ButtonMenuUi
            isActive={appUserComponent === "externals"}
            onClick={() => {
              setAppCurrentPage("user");
              setAppUserComponent("externals");
            }}
          >
            <FaShapes /> {t("user.externals")}
          </ButtonMenuUi>
        )
        }
        {
        (!configSubscription.configuration.subscription || user.profile.subscriptionType >= 8) && (
          <ButtonMenuUi
            isActive={appUserComponent === "webhooks"}
            onClick={() => {
              setAppCurrentPage("user");
              setAppUserComponent("webhooks");
            }}
          >
            <FaBezierCurve /> {t("user.webhooks")}
          </ButtonMenuUi>
        )
        }
        <UserTheme />
        <UserNotification />
        <ButtonMenuUi
          isActive={appUserComponent === "about"}
          onClick={() => {
            setAppCurrentPage("user");
            setAppUserComponent("about");
          }}
        >
          <FaRegQuestionCircle /> {t("user.about")}
        </ButtonMenuUi>
      </Flex>
      <Spacer />
      <Flex flexDirection="column" alignItems="flex-start" width="100%">
        <ButtonMenuUi
          onClick={() => submitLogOut()}
        >
          <FaSignOutAlt /> {t("user.logout")}
        </ButtonMenuUi>
      </Flex>
    </>
  );
};

export default UserLinks;
