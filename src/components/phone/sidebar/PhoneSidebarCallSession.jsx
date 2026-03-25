import { Box, Text, HStack, VStack, IconButton, Flex } from "@chakra-ui/react";
import { MdPhoneDisabled, MdPhoneInTalk, MdMic, MdMicOff, MdPause, MdPlayArrow, MdVideocam } from "react-icons/md";
import { FaPhoneSlash } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";
import { useTranslation } from "react-i18next";

const PhoneSidebarCallSession = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const {
    callSession,
    callSessions,
    switchCall,
    hold,
    unhold,
    mute,
    unmute,
    hangUpCall,
    acceptIncomingCall,
    rejectIncomingCall,
  } = useWazo();

  return (
    <>
      {Object.keys(callSessions).map((sessionId, key) => {
        const currentCallSession = callSessions[sessionId];
        const isActive = callSession.sipCallId == currentCallSession.sipCallId;
        //const isConference = currentCallSession.conference
        return (
          <Box
            key={key}
            bgColor={isActive ? "blue.400" : "bgSecondary"}
            borderRadius="8px"
            my="2"
            minH="14"
            onClick={() => switchCall(currentCallSession)}
          >
            <Flex flexDirection="row" ml="4" justifyContent="space-between" alignItems="center">
              <VStack>
                <Text truncate>
                  {currentCallSession.realDisplayName || currentCallSession.displayName || currentCallSession.number}
                </Text>
                <Text as="sub" alignSelf="flex-start">
                  {currentCallSession.number}
                </Text>
              </VStack>
              {currentCallSession.answered ? (
                <HStack alignItems="center" mt="2">
                  <IconButton
                    variant="ghost"
                    colorPalette={currentCallSession.paused ? "warning" : "secondary"}
                    onClick={() => (currentCallSession.paused ? unhold(currentCallSession) : hold(currentCallSession))}
                    disabled={!isActive}
                  >
                    {currentCallSession.paused ? <MdPlayArrow /> : <MdPause />}
                  </IconButton>
                  <IconButton
                    variant="ghost"
                    colorPalette={currentCallSession.muted ? "danger" : "secondary"}
                    onClick={() => (currentCallSession.muted ? unmute(currentCallSession) : mute(currentCallSession))}
                    disabled={!isActive}
                  >
                    {currentCallSession.muted ? <MdMicOff /> : <MdMic />}
                  </IconButton>
                  <IconButton
                    variant="ghost"
                    colorPalette="danger"
                    onClick={() => hangUpCall(currentCallSession)}
                    disabled={!isActive}
                  >
                    <MdPhoneDisabled />
                  </IconButton>
                </HStack>
              ) : (
                <Flex alignItems="center" mt="2">
                  <Text>{t("phone.lines_calling")}</Text>
                  {!currentCallSession.isCaller &&
                    (currentCallSession.cameraEnabled ? (
                      <IconButton
                        variant="ghost"
                        colorPalette="secondary"
                        onClick={() => {
                          acceptIncomingCall(currentCallSession, true);
                        }}
                      >
                        <MdVideocam />
                      </IconButton>
                    ) : (
                      <IconButton
                        variant="ghost"
                        colorPalette="secondary"
                        onClick={() => {
                          acceptIncomingCall(currentCallSession, false);
                        }}
                      >
                        <MdPhoneInTalk />
                      </IconButton>
                    ))}

                  {!callSession.isCaller ? (
                    <IconButton variant="ghost" colorPalette="danger" onClick={() => rejectIncomingCall(callSession)}>
                      <FaPhoneSlash />
                    </IconButton>
                  ) : (
                    <IconButton variant="ghost" colorPalette="danger" onClick={() => hangUpCall(callSession)}>
                      <FaPhoneSlash />
                    </IconButton>
                  )}
                </Flex>
              )}
            </Flex>
          </Box>
        );
      })}
    </>
  );
};

export default PhoneSidebarCallSession;
