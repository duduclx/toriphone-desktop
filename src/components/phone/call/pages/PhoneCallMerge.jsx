import { useState, useEffect } from "react";
import { Button, Text, Checkbox, Flex, Box } from "@chakra-ui/react";
import { CheckboxUi } from "../../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../../services/WazoProvider";

const PhoneCallMerge = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { appLarge, callSession, callSessions, conferenceAdhocStart, handleToggleMerge } = useWazo();

  // values
  const [otherCalls, setOtherCalls] = useState([]);
  const [checkedCalls, setCheckedCalls] = useState([]);

  useEffect(() => {
    if (callSession && Object.keys(callSession).length !== 0) {
      setOtherCalls(
        Object.values(callSessions).filter((objet) => objet !== callSessions[callSession.getId()] && !objet.isVideo)
      );
    }
  }, [callSession, callSessions]);

  const handleCheck = (e) => {
    const callId = e.target.value;
    const checkedCall = otherCalls.find((call) => call.callId === callId);
    if (e.target.checked) {
      // Si la case est cochée, ajouter l'objet d'appel à checkedCalls
      setCheckedCalls([...checkedCalls, checkedCall]);
    } else {
      // Si la case est décochée, retirer l'objet d'appel de checkedCalls
      setCheckedCalls(checkedCalls.filter((call) => call.callId !== callId));
    }
  };

  const handleMerge = () => {
    handleToggleMerge();
    conferenceAdhocStart(checkedCalls);
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      width={appLarge ? "20%" : "40%"}
      m="4"
      bg="bgSecondary"
      p="4"
      borderRadius="14px"
    >
      <Box>
        <Text textAlign="center" mb="4">
          {t("conference.title")}
        </Text>
        <Checkbox.Group>
          {otherCalls.map((call, index) => (
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
      </Box>
      <Button colorPalette="primary" onClick={() => handleMerge()}>{t("conference.merge")}</Button>
    </Flex>
  );
};

export default PhoneCallMerge;
