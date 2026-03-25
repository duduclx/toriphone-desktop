import { I18nextProvider } from "react-i18next";

import { useAuth, UserLogin } from "toriphone-auth";
import Layout from "./Layout";
import i18n from "../i18n";

import { WazoProvider } from "../services/WazoProvider";
import MeetJoin from "../components/meet/join/MeetJoin";

const Index = () => {
  // api
  const { user } = useAuth();

  // detect route /meeting
  const isMeetingRoute = window.location.pathname === "/meeting";

  // 🎯 MODE INVITÉ : accès direct à /meeting
  if (isMeetingRoute && !user) {
    return (
      <I18nextProvider i18n={i18n}>
        <WazoProvider>
          <MeetJoin />
        </WazoProvider>
      </I18nextProvider>
    );
  }

  // 🎯 MODE CONNECTÉ
  return user ? (
    <Layout />
  ) : (
    <I18nextProvider i18n={i18n}>
      <UserLogin i18nInstance={i18n} />
    </I18nextProvider>
  );
};

export default Index;
