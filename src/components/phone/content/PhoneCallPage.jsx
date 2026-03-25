import { useEffect } from "react";

import { Box, Flex } from "@chakra-ui/react";

import { useWazo } from "../../../services/WazoProvider";

import PhoneCallHeader from "../call/pages/PhoneCallHeader";
import PhoneCallRinging from "../call/pages/PhoneCallRinging";
import PhoneCallAudio from "../call/pages/PhoneCallAudio";
import PhoneCallVideo from "../call/pages/PhoneCallVideo";
import PhoneCallChat from "../call/pages/PhoneCallChat";
import PhoneCallMerge from "../call/pages/PhoneCallMerge";
import PhoneCallConference from "../call/pages/PhoneCallConference";

const PhoneCallPage = () => {
  const {
    callSession,
    callChatMessages,
    isFullScreen,
    toggleChat,
    toggleMerge,
    toggleConference,
    setToggleChat,
  } = useWazo();

  useEffect(() => {
    {
      callChatMessages.map((msg) => {
        if (callSession.call?.talkingToIds.includes(msg.call)) {
          setToggleChat(true);
        }
      });
    }
  }, [callChatMessages]);

  const isRealCall = typeof callSession.getId === 'function' && !callSession.switchboard?.isSwitchboardCall; // fait planter lors d'appel externe !! ??
  const isCall = Object.keys(callSession).length > 0;
  const isCalling = Object.keys(callSession).length > 0 && !callSession.answered;
  const isVideoCall = callSession.cameraEnabled;

  const displayName = callSession.realDisplayName || callSession.displayName || callSession.number;

  return isRealCall ? (
    <>
      {!isFullScreen && <Box m="4">{isCall && <PhoneCallHeader displayName={displayName} />}</Box>}
      <Flex flexDirection="row" flex="1">
        {isCalling ? <PhoneCallRinging /> : isVideoCall ? <PhoneCallVideo /> : <PhoneCallAudio />}
        {toggleChat && <PhoneCallChat />}
        {toggleMerge && <PhoneCallMerge />}
        {toggleConference && <PhoneCallConference />}
      </Flex>
    </>
  ): null;
};

export default PhoneCallPage;
