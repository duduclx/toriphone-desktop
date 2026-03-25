import { useState, useEffect } from "react";
import { Flex, IconButton, Text, Spacer, HStack } from "@chakra-ui/react";
import { toaster } from "../../../ui/toaster";
import { useTranslation } from "react-i18next";
import { MdPanTool } from "react-icons/md";
import { FaCommentAlt, FaCompressAlt, FaPhoneAlt, FaVideo } from "react-icons/fa";

import { useWazo } from "../../../../services/WazoProvider";

const PhoneCallHeader = ({ displayName }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const {
    sendSignal,
    callSessions,
    callSession,
    callToggle,
    handleToggleChat,
    handleToggleMerge,
    handleToggleConference,
    setToggleConference,
  } = useWazo();

  // values
  const [calls, setCalls] = useState([]);

  const onSendSignal = () => {
    sendSignal({ user: callSession.call.callerName || callSession.call.callerNumber });
    toaster.create({
      title: t("phone.send_signal_sender_title"),
      type: "success",
      duration: 3000,
      closable: true,
    });
  };

  const onToggleCall = () => {
    callSession.cameraEnabled ? callToggle(callSession, false) : callToggle(callSession, true);
    //setIsVideo(!isVideo);
  };

  useEffect(() => {
    if (Object.keys(callSessions).length >= 0) {
      const calls = Object.values(callSessions)
        .filter(
          //(callSession) => !callSession.conference && !callSession.call?.isVideo
          (callSession) => !callSession.conference
        )
        .map((callSession) => ({
          callId: callSession.callId,
          displayName: callSession.displayName,
        }));
      setCalls(calls);
    }
    if (!callSession.conference) {
      setToggleConference(false);
    }
  }, [callSession, callSessions]);

  return (
    <Flex flexDirection="row" justifyContent="center" alignItems="center">
      <Spacer />
      <Text textAlign="center" fontSize="2xl" fontWeight="bold" >{displayName}</Text>
      <Spacer />
      {callSession.answered && (
        <HStack gap="4">
          {callSession.call?.direction && callSession.call.direction === "internal" && (
            <IconButton variant="ghost" onClick={() => onToggleCall()}>
              {callSession.cameraEnabled ? <FaPhoneAlt /> : <FaVideo />}
            </IconButton>
          )}
          {calls.length >= 2 && (
            <IconButton variant="ghost" onClick={() => handleToggleMerge()}>
              <FaCompressAlt />
            </IconButton>
          )}
          {callSession.conference && (
            <IconButton variant="ghost" onClick={() => handleToggleConference()}>
              <FaCompressAlt />
            </IconButton>
          )}
          {callSession.call?.direction && callSession.call.direction === "internal" && (
            <IconButton variant="ghost" onClick={() => handleToggleChat()}>
              <FaCommentAlt />
            </IconButton>
          )}
          {callSession.call?.direction && callSession.call.direction === "internal" && (
            <IconButton variant="ghost" onClick={() => onSendSignal()}>
              <MdPanTool />
            </IconButton>
          )}
        </HStack>
      )}
    </Flex>
  );
};

export default PhoneCallHeader;
