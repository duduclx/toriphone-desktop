import { useEffect, useRef } from "react";
import { Text, HStack, IconButton } from "@chakra-ui/react";
import { toaster } from "../ui/toaster";
import { useTranslation } from "react-i18next";
import { MdVideocam, MdPhoneInTalk } from "react-icons/md";
import { FaPhoneSlash } from "react-icons/fa";

import { useWazo } from "../../services/WazoProvider";

const PhoneIncoming = () => {
  // requirements
  const { t } = useTranslation();
  const toastIdRef = useRef();

  // api
  const { incomingCall, callSession, acceptIncomingCall, rejectIncomingCall } = useWazo();

  const close = () => {
    if (toastIdRef.current) {
      toaster.dismiss(toastIdRef.current);
    }
  };

  useEffect(() => {
    if (callSession.answered || !incomingCall) {
      close();
    }
  }, [callSession.answered, incomingCall]);

  const showNotification = () => {
    if ("Notification" in window) {
      new Notification(t("user.notification_title"), {
        body: callSession.realDisplayName || callSession.displayName || callSession.number,
        icon: "/wazo-logo.svg",
      });
    }
  };

  const handleIncomingCall = () => {
    toastIdRef.current = toaster.create({
      title: t("phone.incomingCall"),
      type: "info",
      duration: 29000,
      closable: true,
      description: (
        <HStack justifyContent="center" gap="8">
          <Text>{callSession.realDisplayName || callSession.displayName || callSession.number}</Text>
          {callSession.cameraEnabled ? (
            <IconButton
              rounded="100%"
              size="lg"
              colorPalette="secondary"
              onClick={() => {
                close();
                acceptIncomingCall(callSession, true);
              }}
            >
              <MdVideocam />
            </IconButton>
          ) : (
            <IconButton
              rounded="100%"
              size="lg"
              colorPalette="secondary"
              onClick={() => {
                close();
                acceptIncomingCall(callSession, false);
              }}
            >
              <MdPhoneInTalk />
            </IconButton>
          )}
          <IconButton
            rounded="100%"
            size="lg"
            colorPalette="danger"
            onClick={() => {
              close();
              rejectIncomingCall(callSession);
            }}
          >
            <FaPhoneSlash />
          </IconButton>
        </HStack>
      ),
    });
  };

  useEffect(() => {
    if (incomingCall) {
      handleIncomingCall();
      showNotification();
    }
  }, [incomingCall]);

  return null;
};

export default PhoneIncoming;
