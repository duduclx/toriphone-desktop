import { Flex } from "@chakra-ui/react";

import ContactsSidebar from "./sidebar/ContactsSidebar";
import ContactsFavorites from "./favorites/ContactsFavorites";
import ContactsGoogle from "./google/ContactsGoogle";
import ContactsInternal from "./internal/ContactsInternal";
import ContactsOffice from "./office/ContactsOffice";
import ContactsPersonal from "./personal/ContactsPersonal";
import ContactsPhonebook from "./phonebook/ContactsPhonebook";
import ContactsLdap from "./ldap/ContactsLdap";

import { useWazo } from "../../services/WazoProvider";
import ToggleSidebar from "../sidebar/ToggleSidebar";

const Contacts = () => {
  // api
  const { appLarge, appContactsComponent, showSidebar } = useWazo();

  return (
    <>
      {appLarge && (
        <Flex justifyContent="flex-start" width={showSidebar ? "384px" : "0px"} transition="width 0.5s ease-in-out">
          <ContactsSidebar />
          <Flex justifyContent="center" alignItems="center" width={0}>
            <ToggleSidebar />
          </Flex>
        </Flex>
      )}
      {appContactsComponent === "favorites" && <ContactsFavorites />}
      {appContactsComponent === "google" && <ContactsGoogle />}
      {appContactsComponent === "internal" && <ContactsInternal />}
      {appContactsComponent === "office" && <ContactsOffice />}
      {appContactsComponent === "personal" && <ContactsPersonal />}
      {appContactsComponent === "phonebook" && <ContactsPhonebook />}
      {appContactsComponent === "ldap" && <ContactsLdap />}
    </>
  );
};

export default Contacts;
