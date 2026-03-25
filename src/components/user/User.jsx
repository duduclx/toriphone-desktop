import { Flex } from "@chakra-ui/react";

import UserSidebar from "./sidebar/UserSidebar";
import UserProfil from "./profil/UserProfil";
import UserPassword from "./password/UserPassword";
import UserForwards from "./forwards/UserForwards";
import UserFax from "./fax/UserFax";
import UserFunckeys from "./funckeys/UserFunckeys";
import UserPreferences from "./preferences/UserPreferences";
import About from "./about/About";
import UserBlocklist from "./blocklist/UserBlocklist";
import UserExternals from "./externals/UserExternals";
import UserWebhooks from "./webhooks/UserWebhooks";

import ToggleSidebar from "../sidebar/ToggleSidebar";

import { useWazo } from "../../services/WazoProvider";

const User = () => {
  // api
  const { appLarge, showSidebar, appUserComponent } = useWazo();

  return (
    <>
    {appLarge && (
      <Flex justifyContent="flex-start" width={showSidebar ? "384px" : "0px"} transition="width 0.5s ease-in-out">
        <UserSidebar />
        <Flex justifyContent="center" alignItems="center" width={0}>
          <ToggleSidebar />
        </Flex>
      </Flex>
    )}
      {appUserComponent === "profile" && <UserProfil />}
      {appUserComponent === "password" && <UserPassword />}
      {appUserComponent === "renvois" && <UserForwards />}
      {appUserComponent === "fax" && <UserFax />}
      {appUserComponent === "funckeys" && <UserFunckeys />}
      {appUserComponent === "preferences" && <UserPreferences />}
      {appUserComponent === "about" && <About />}
      {appUserComponent === "blocklist" && <UserBlocklist />}
      {appUserComponent === "externals" && <UserExternals />}
      {appUserComponent === "webhooks" && <UserWebhooks />}
    </>
  );
};

export default User;
