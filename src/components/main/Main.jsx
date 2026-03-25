import { Flex } from "@chakra-ui/react";

import Sidebar from "../sidebar/Sidebar";

import { useWazo } from "../../services/WazoProvider";

import Phone from "../phone/Phone";
import CallLog from "../callLog/CallLog"
import Voicemails from "../voicemails/Voicemails";
import Contacts from "../contacts/Contacts";
import Chat from "../chat/Chat";
import Meet from "../meet/Meet";
import Switchboard from "../switchboard/Switchboard";
import User from "../user/User";
import MeetJoin from "../meet/join/MeetJoin";

import Twilio from "../plugins/sms/twilio/Twilio";

import ApiProviderWithSettings from "toriphone-admin";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

const Main = () => {
  // api
  const { appCurrentPage, setAppCurrentPage } = useWazo();

  // detect route /meeting
  const isMeetingRoute = window.location.pathname === "/meeting";

  if (isMeetingRoute) {
    setAppCurrentPage("meeting");
  }

  return (
    <Flex bg="bgDefault" flex="1">
      <Sidebar />
      {appCurrentPage === 'phone' && <Phone />}
      {appCurrentPage === 'callLog' && <CallLog />}
      {appCurrentPage === 'voicemails' && <Voicemails />}
      {appCurrentPage === 'contacts' && <Contacts />}
      {appCurrentPage === 'chat' && <Chat />}
      {appCurrentPage === 'meet' && <Meet />}
      {appCurrentPage === 'meeting' && <MeetJoin />}
      {appCurrentPage === 'switchboard' && <Switchboard />}
      {appCurrentPage === 'smsTwilio' && <Twilio />}
      {appCurrentPage === 'user' && <User />}
      {appCurrentPage === 'settings' && (
        <I18nextProvider i18n={i18n}>
          <ApiProviderWithSettings i18nInstance={i18n} loginType="client"/>
        </I18nextProvider>
      )
      }
    </Flex>
  );
};

export default Main;
