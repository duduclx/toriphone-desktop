import { FaStar, FaGoogle, FaMicrosoft, FaUserFriends, FaBook, FaAddressBook } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { ButtonMenuUi } from "../../../ui";

import { useWazo } from "../../../services/WazoProvider";

const ContactsLinks = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { contactsOffice, contactsGoogle, appContactsComponent, setAppContactsComponent, setAppCurrentPage } =
    useWazo();

  return (
    <>
      <ButtonMenuUi
        isActive={appContactsComponent === "favorites"}
        onClick={() => {
          setAppCurrentPage("contacts");
          setAppContactsComponent("favorites");
        }}
      >
        <FaStar />{t("contacts.sidebar_favorite")}
      </ButtonMenuUi>
      <ButtonMenuUi
        isActive={appContactsComponent === "internal"}
        onClick={() => {
          setAppCurrentPage("contacts");
          setAppContactsComponent("internal");
        }}
      >
        <FaAddressBook /> {t("contacts.sidebar_internal")}
      </ButtonMenuUi>
      <ButtonMenuUi
        isActive={appContactsComponent === "phonebook"}
        onClick={() => {
          setAppCurrentPage("contacts");
          setAppContactsComponent("phonebook");
        }}
      >
        <FaBook /> {t("contacts.sidebar_phonebook")}
      </ButtonMenuUi>
      {contactsGoogle.length > 0 && (
        <ButtonMenuUi
          isActive={appContactsComponent === "google"}
          onClick={() => {
            setAppCurrentPage("contacts");
            setAppContactsComponent("google");
          }}
        >
          <FaGoogle /> {t("contacts.sidebar_google")}
        </ButtonMenuUi>
      )}
      {contactsOffice.length > 0 && (
        <ButtonMenuUi
          isActive={appContactsComponent === "office"}
          onClick={() => {
            setAppCurrentPage("contacts");
            setAppContactsComponent("office");
          }}
        >
          <FaMicrosoft /> {t("contacts.sidebar_office")}
        </ButtonMenuUi>
      )}
      <ButtonMenuUi
        isActive={appContactsComponent === "personal"}
        onClick={() => {
          setAppCurrentPage("contacts");
          setAppContactsComponent("personal");
        }}
      >
        <FaUserFriends /> {t("contacts.sidebar_personal")}
      </ButtonMenuUi>
      {/*
      <ButtonMenuUi
        isActive={appContactsComponent === "ldap"}
        onClick={() => {
          setAppCurrentPage("contacts");
          setAppContactsComponent("ldap");
        }}
      >
        <FaUserFriends /> {t("contacts.sidebar_ldap")}
      </ButtonMenuUi>
      */}
    </>
  );
};

export default ContactsLinks;
