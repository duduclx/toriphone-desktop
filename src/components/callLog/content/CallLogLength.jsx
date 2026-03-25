import { useState } from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const CallLogLength = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { callLogGet, callLogLength, setCallLogLength } = useWazo();
  const { storagePrefsSet } = useAuth();

  // resources
  const [callLength, setCallLength] = useState(callLogLength);

  const callLengthValid = callLength.length >= 1 && callLength.length <= 30;

  const handleChangeCallLogLength = (e) => {
    setCallLength(e.target.value);
  };

  const applyChangeCallLogLength = (e) => {
    if (callLengthValid) {
      setCallLogLength(callLength);
      storagePrefsSet({ callsLength: callLength });
      callLogGet();
      toaster.create({
        type: "success",
        title: t("callLog.length_event"),
        description: t("callLog.length_event_true"),
        duration: 3000,
        closable: true
      });
    } else {
      toaster.create({
        type: "error",
        title: t("callLog.length_event"),
        description: t("callLog.length_event_false"),
        duration: 3000,
        closable: true
      });
    }
  };

  const onKeyDownCallLog = (event) => {
    if (event.key === "Enter") {
      applyChangeCallLogLength();
    }
  };
  return (
    <Box > 
      <Flex
        flexDirection="row"
        flex="1"
        justifyContent="flex-end"
        alignItems="center"
        gap="4"
      >
        <Box>
          <Text>{t("callLog.length")}</Text>
        </Box>
        <InputUi
          width="100px"
          placeholder={callLogLength}
          onChange={(e) => handleChangeCallLogLength(e)}
          onKeyDown={(e) => onKeyDownCallLog(e)}
        />
        <Button colorPalette="primary" onClick={() => applyChangeCallLogLength()}>
          {t("callLog.button")}
        </Button>
      </Flex>
    </Box>
  );
};

export default CallLogLength;
