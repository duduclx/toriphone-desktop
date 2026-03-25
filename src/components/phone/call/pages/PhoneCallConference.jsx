import { useState, useEffect } from "react";
import { Button, Checkbox, Flex, IconButton, Separator, Text } from "@chakra-ui/react";
import { CheckboxUi } from "../../../../ui";
import { FaUserTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../../services/WazoProvider";

const PhoneCallConference = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const {
    appLarge,
    callSession,
    callSessions,
    conferenceAdhoc,
    conferenceAdhocRemoveParticipant,
    conferenceAdhocAddParticipant,
    setToggleConference,
  } = useWazo();

  // values
  const [checkedCalls, setCheckedCalls] = useState([]);
  const [isAudio, setIsAudio] = useState([]);
  const [participantsArray, setParticipantsArray] = useState(Object.values(conferenceAdhoc?.participants || []));

  useEffect(() => {
    if (conferenceAdhoc) {
      setParticipantsArray(Object.values(conferenceAdhoc.participants || {}));
    } else {
      setToggleConference(false);
    }
  }, [conferenceAdhoc, callSession]);

  useEffect(() => {
    if (callSession && Object.keys(callSession).length !== 0) {
      const checkIsAudio = Object.values(callSessions).filter(
        (callSession) => !callSession.conference && !callSession.call?.isVideo
      );
      setIsAudio(checkIsAudio);
    }
  }, [callSession, callSessions]);

  const handleCheck = (e) => {
    const callId = e.target.value;
    const checkedCall = isAudio.find((call) => call.callId === callId);
    if (e.target.checked) {
      setCheckedCalls([...checkedCalls, checkedCall]);
    } else {
      setCheckedCalls(checkedCalls.filter((call) => call.callId !== callId));
    }
  };

  const handleRemove = async (participant) => {
    await conferenceAdhocRemoveParticipant(participant);
  };

  const handleAdd = async () => {
    await conferenceAdhocAddParticipant(checkedCalls);
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      width={appLarge ? "20%" : "40%"}
      m="4"
      bg="bgSecondary"
      p="4"
      borderRadius="14px"
      gap="20"
    >
      <Flex flexDirection="column" gap="4">
        <Text textAlign="center">{t("conference.participants")}</Text>
        <Checkbox.Group>
          {participantsArray.map((participant, index) => (
            <Flex key={index} justifyContent="space-between" p="2" borderRadius="12px">
              <Text>{participant.displayName}</Text>
              <IconButton size="xs" onClick={() => handleRemove(participant)}>
                <FaUserTimes />
              </IconButton>
            </Flex>
          ))}
        </Checkbox.Group>
      </Flex>
      {isAudio.length >= 1 && (
        <Flex flexDirection="column" gap="4">
          <Separator />
          <Text textAlign="center">{t("conference.available")}</Text>
          <Checkbox.Group>
            {isAudio.map((call, index) => (
              <CheckboxUi
                key={index}
                value={call.callId}
                checked={checkedCalls.includes(call.callId)}
                onChange={(e) => handleCheck(e)}
              >
                {call.displayName}
              </CheckboxUi>
            ))}
          </Checkbox.Group>
          <Button colorPalette="primary" onClick={() => handleAdd()}>{t("conference.add")}</Button>
        </Flex>
      )}
    </Flex>
  );
};

export default PhoneCallConference;
