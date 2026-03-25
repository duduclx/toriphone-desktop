import { useRef } from "react";
import { Box, IconButton, Text, useDisclosure, Menu } from "@chakra-ui/react";
import { FaPhoneSlash, FaRecordVinyl, FaPause, FaPlay, FaStop } from "react-icons/fa";
import { MdPhoneForwarded, MdMic, MdMicOff, MdPause, MdPlayArrow } from "react-icons/md";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../../services/WazoProvider";

import PhoneCallDTMF from "../actions/PhoneCallDTMF";
import PhoneCallTransfer from "../actions/PhoneCallTransfer";

const AudioToolbar = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const {
    callSession,
    hold,
    unhold,
    mute,
    unmute,
    hangUpCall,
    callRecordStart,
    callRecordPause,
    callRecordResume,
    callRecordStop,
  } = useWazo();

  // transfert modal
  const { open, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  // open modal
  const openFwd = () => {
    onOpen();
  };

  // pause call
  const handlePause = async () => {
    // il faut regarder si il y a un enregistrement en cours
    // si oui, le mettre en pause, puis mettre en pause l'appel
  };

  const handleResume = async () => {
    // il faut regarder si il y a un enregistrement
    // si oui, reprendre l'appel puis reprendre l'enregistrement
  };

  return (
    <>
      <Text textAlign="center">
        <IconButton rounded="100%" size="lg" colorPalette="red" onClick={() => hangUpCall(callSession)}>
          <FaPhoneSlash />
        </IconButton>
      </Text>
      <Box display="flex" alignItems="flex-end" justifyContent="center" width="100%" gap="8" my="2">
        <IconButton
          rounded="100%"
          size="lg"
          colorPalette={callSession.paused ? "warning" : "secondary"}
          onClick={() => (callSession.paused ? unhold(callSession) : hold(callSession))}
        >
          {callSession.paused ? <MdPlayArrow /> : <MdPause />}
        </IconButton>
        <IconButton
          rounded="100%"
          size="lg"
          colorPalette={callSession.muted ? "danger" : "secondary"}
          onClick={() => (callSession.muted ? unmute(callSession) : mute(callSession))}
        >
          {callSession.muted ? <MdMicOff /> : <MdMic />}
        </IconButton>
        <PhoneCallDTMF round={true} />
        <IconButton rounded="100%" size="lg" colorPalette="secondary" onClick={() => openFwd()}>
          <MdPhoneForwarded />
        </IconButton>
        {/*
        <IconButton
          rounded="100%"
          size="lg"
          colorPalette={
            callSession.recording
              ? callSession.recordingPaused
                ? "yellow"
                : "blue" 
              : "green"
          }
          onClick={() => {
            if (!callSession.recording) {
              callRecordStart(callSession);
            } else if (callSession.recordingPaused) {
              callRecordResume(callSession);
            } else {
              callRecordPause(callSession);
            }
          }}
        ><FaRecordVinyl /></IconButton>
        */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton
              rounded="100%"
              size="lg"
              colorPalette={callSession.recording ? (callSession.recordingPaused ? "warning" : "primary") : "secondary"}
              onClick={() => {
                if (!callSession.recording) {
                  callRecordStart(callSession); // Démarrer si inactif
                }
              }}
            >
              <FaRecordVinyl />
            </IconButton>
          </Menu.Trigger>
          <Menu.Positioner>
            {callSession.recording && (
              <Menu.Content bg="bgSecondary">
                {callSession.recordingPaused ? (
                  <Menu.Item bg="bgSecondary" onClick={() => callRecordResume(callSession)}>
                    <FaPlay /> {t("phone.record_resume")}
                  </Menu.Item>
                ) : (
                  <>
                    <Menu.Item bg="bgSecondary" onClick={() => callRecordPause(callSession)}>
                      <FaPause /> {t("phone.record_pause")}
                    </Menu.Item>
                    <Menu.Item bg="bgSecondary" onClick={() => callRecordStop(callSession)}>
                      <FaStop /> {t("phone.record_stop")}
                    </Menu.Item>
                  </>
                )}
              </Menu.Content>
            )}
          </Menu.Positioner>
        </Menu.Root>
      </Box>
      <PhoneCallTransfer initialRef={initialRef} open={open} onOpenChange={onClose} callSession={callSession} />
    </>
  );
};

export default AudioToolbar;
