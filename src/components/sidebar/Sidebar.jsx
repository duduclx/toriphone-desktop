import { useEffect, useRef } from "react";
import { Flex, Spacer, IconButton, Box } from "@chakra-ui/react";
import {
  FaPhone,
  FaCommentAlt,
  FaTv,
  FaUsers,
  FaHistory,
  FaVoicemail,
  FaAddressCard,
  FaUser,
  FaCogs,
  FaSms,
} from "react-icons/fa";
import { toaster } from "../ui/toaster";

import { useWazo } from "../../services/WazoProvider";
import { useAuth } from "toriphone-auth";
import BadgeNotification from "../../utils/BadgeNotification";

import Logo from "./Logo";
import UserDND from "../user/UserDnd";
import UserStatus from "../user/UserStatus";
import UserAgent from "../user/UserAgent";

import PhoneCallsMenu from "../phone/sidebar/PhoneCallsMenu";
import PhoneMenu from "../phone/sidebar/PhoneMenu";
import CallLogMenu from "../callLog/sidebar/CallLogMenu";
import VoicemailsMenu from "../voicemails/sidebar/VoicemailsMenu";
import ContactsMenu from "../contacts/sidebar/ContactsMenu";
import ChatMenu from "../chat/sidebar/ChatMenu";
import UserMenu from "../user/sidebar/UserMenu";
import SwitchboardMenu from "../switchboard/sidebar/SwitchboardMenu";
import MeetMenu from "../meet/sidebar/MeetMenu";

const Sidebar = () => {
  // api
  const { user } = useAuth();
  const {
    configSubscription,
    appLarge,
    appCurrentPage,
    setAppCurrentPage,
    voicemails,
    callLogBadge,
    callLogBadgeReset,
    chatMessageUnread,
    externalApps,
    voicemailsUnread,
    switchboards,
    setMeetingRoute
  } = useWazo();

  // chat messages unread
  const TotalUnread = Object.values(chatMessageUnread).reduce((total, count) => total + count, 0);

  // smsTwilio externalapps
  const userUuid = user.uuid;
  let smsTwilio = false;

  externalApps.items?.forEach((item) => {
    if (item.name === "sms-twilio") {
      if (item.configuration.purpose === "tenant") {
        smsTwilio = true;
      } else if (item.configuration.users && Array.isArray(item.configuration.users)) {
        smsTwilio = item.configuration.users.some((userItem) => userItem.uuid === userUuid);
      }
    }
  });

  const userIsAdmin = user.acl && user.acl.some((acl) => acl.startsWith("confd.#"));

  // switchboard notification
  const previousSwitchboards = useRef([]);

  useEffect(() => {
    if (previousSwitchboards.current.length === 0) {
      previousSwitchboards.current = switchboards;
      return;
    }

    switchboards.forEach((currentBoard) => {
      const previousBoard = previousSwitchboards.current.find((b) => b.uuid === currentBoard.uuid);

      if (previousBoard) {
        if (currentBoard.queued.length > previousBoard.queued.length) {
          const newCalls = currentBoard.queued.slice(previousBoard.queued.length);
          newCalls.forEach((call) => {
            toaster.create({
              type: "info",
              title: `📞 Nouvel appel dans ${currentBoard.name}`, // a convertir en nom ?
              description: call.caller_id_name || call.caller_id_number,
              duration: 3000,
              closable: true,
            });
          });
        }
      }
    });

    previousSwitchboards.current = switchboards;
  }, [switchboards]);

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      height="100vh"
      overflowX="hidden"
      overflowY="auto"
      bg="bgPrimary"
      className="hide-scrollbar"
      minWidth="72px"
      zIndex="2"
    >
      <Flex flexDirection="column" gap="2" p="4">
        <Box alignSelf="center" mb="4">
          <Logo />
        </Box>
        <Box alignSelf="center" mb="2">
          <UserStatus />
        </Box>
        <Box alignSelf="center">
          <UserDND />
        </Box>
        <Box alignSelf="center">
          {(!configSubscription.configuration.subscription || user.profile.subscriptionType >= 4) && <UserAgent />}
        </Box>
        {!appLarge && <PhoneCallsMenu />}
      </Flex>
      <Spacer />
      <Flex flexDirection="column" gap="4" p="4">
        {(!configSubscription.configuration.subscription || user.profile.subscriptionType >= 1) &&
          (appLarge ? (
            <IconButton
              variant={appCurrentPage === "phone" ? "outline" : "ghost"}
              colorPalette={appCurrentPage === "phone" ? "blue" : ""}
              onClick={() => {
                setAppCurrentPage("phone");
                window.history.pushState({}, "", "/");
                setMeetingRoute(false);
              }}
            >
              <FaPhone />
            </IconButton>
          ) : (
            <PhoneMenu />
          ))}
        {(!configSubscription.configuration.subscription || user.profile.subscriptionType >= 1) &&
          (appLarge ? (
            <Box position="relative">
              <Box position="absolute" top="6px" right="-4px" zIndex="2">
                {callLogBadge >= 1 ? <BadgeNotification>{callLogBadge}</BadgeNotification> : null}
              </Box>
              <IconButton
                variant={appCurrentPage === "callLog" ? "outline" : "ghost"}
                colorPalette={appCurrentPage === "callLog" ? "blue" : ""}
                onClick={() => {
                  setAppCurrentPage("callLog");
                  callLogBadgeReset();
                  window.history.pushState({}, "", "/");
                  setMeetingRoute(false);
                }}
              >
                <FaHistory />
              </IconButton>
            </Box>
          ) : (
            <CallLogMenu callLogBadge={callLogBadge} callLogBadgeReset={callLogBadgeReset} />
          ))}
        {(!configSubscription.configuration.subscription || user.profile.subscriptionType >= 2) &&
          (appLarge
            ? voicemails !== null && (
                <Box position="relative">
                  <Box position="absolute" top="6px" right="-4px" zIndex="2">
                    {voicemailsUnread >= 1 ? <BadgeNotification>{voicemailsUnread}</BadgeNotification> : null}
                  </Box>
                  <IconButton
                    variant={appCurrentPage === "voicemails" ? "outline" : "ghost"}
                    colorPalette={appCurrentPage === "voicemails" ? "blue" : ""}
                    onClick={() => {
                      setAppCurrentPage("voicemails");
                      window.history.pushState({}, "", "/");
                      setMeetingRoute(false);
                    }}
                  >
                    <FaVoicemail />
                  </IconButton>
                </Box>
              )
            : voicemails !== null && <VoicemailsMenu voicemailsUnread={voicemailsUnread} />)}
        {appLarge ? (
          <IconButton
            variant={appCurrentPage === "contacts" ? "outline" : "ghost"}
            colorPalette={appCurrentPage === "contacts" ? "blue" : ""}
            onClick={() => {
              setAppCurrentPage("contacts");
              window.history.pushState({}, "", "/");
              setMeetingRoute(false);
            }}
          >
            <FaAddressCard />
          </IconButton>
        ) : (
          <ContactsMenu />
        )}
        {(!configSubscription.configuration.subscription || user.profile.subscriptionType >= 3) &&
          (appLarge ? (
            <Box position="relative">
              <Box position="absolute" top="6px" right="-4px" zIndex="2">
                {TotalUnread >= 1 ? <BadgeNotification>{TotalUnread}</BadgeNotification> : null}
              </Box>
              <IconButton
                variant={appCurrentPage === "chat" ? "outline" : "ghost"}
                colorPalette={appCurrentPage === "chat" ? "blue" : ""}
                onClick={() => {
                  setAppCurrentPage("chat");
                  window.history.pushState({}, "", "/");
                  setMeetingRoute(false);
                }}
              >
                <FaCommentAlt />
              </IconButton>
            </Box>
          ) : (
            <ChatMenu TotalUnread={TotalUnread} />
          ))}
        {(!configSubscription.configuration.subscription || user.profile.subscriptionType >= 4) &&
          (appLarge
            ? switchboards.length > 0 && (
                <IconButton
                  variant={appCurrentPage === "switchboard" ? "outline" : "ghost"}
                  colorPalette={appCurrentPage === "switchboard" ? "blue" : ""}
                  onClick={() => {
                    setAppCurrentPage("switchboard");
                    window.history.pushState({}, "", "/");
                    setMeetingRoute(false);
                  }}
                >
                  <FaTv />
                </IconButton>
              )
            : switchboards.length > 0 && <SwitchboardMenu />)}

        {appLarge ? (
          <IconButton
            variant={appCurrentPage === "meet" ? "outline" : "ghost"}
            colorPalette={appCurrentPage === "meet" ? "blue" : ""}
            onClick={() => {
              setAppCurrentPage("meet");
              window.history.pushState({}, "", "/");
              setMeetingRoute(false);
            }}
          >
            <FaUsers />
          </IconButton>
        ) : (
          <MeetMenu />
        )}

        {/*
        
        {smsTwilio && (
          <IconButton
            variant="ghost"
            onClick={() => {
              setAppCurrentPage("smsTwilio");
              window.history.pushState({}, "", "/");
              setMeetingRoute(false);
            }}
          ><FaSms /></IconButton>
        )}
        */}
      </Flex>
      <Spacer />
      <Flex flexDirection="column" gap="4" p="4">
        {appLarge ? (
          <IconButton
            variant={appCurrentPage === "user" ? "outline" : "ghost"}
            colorPalette={appCurrentPage === "user" ? "blue" : ""}
            onClick={() => {
              setAppCurrentPage("user");
              window.history.pushState({}, "", "/");
              setMeetingRoute(false);
            }}
          >
            <FaUser />
          </IconButton>
        ) : (
          <UserMenu />
        )}
        {(!configSubscription.configuration.subscription || user.profile.subscriptionType >= 10) && userIsAdmin && (
          <IconButton
            variant={appCurrentPage === "settings" ? "outline" : "ghost"}
            colorPalette={appCurrentPage === "settings" ? "blue" : ""}
            onClick={() => {
              setAppCurrentPage("settings");
              window.history.pushState({}, "", "/");
              setMeetingRoute(false);
            }}
          >
            <FaCogs />
          </IconButton>
        )}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
