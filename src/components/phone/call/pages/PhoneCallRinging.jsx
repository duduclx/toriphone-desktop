import { Flex, IconButton, Text } from "@chakra-ui/react";
import { FaPhoneSlash } from "react-icons/fa";
import { MdVideocam, MdPhoneInTalk } from "react-icons/md";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../../services/WazoProvider";

const PhoneCallRinging = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { callSession, acceptIncomingCall, rejectIncomingCall, hangUpCall } = useWazo();

  return (
    <Flex flex="1" justifyContent="center" gap="10" marginTop="4" alignItems="center">
      <Text>{t("phone.lines_calling")}</Text>
      {!callSession.isCaller &&
        (callSession.cameraEnabled ? (
          <IconButton
            rounded="100%"
            size="lg"
            colorPalette="secondary"
            onClick={() => {
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
              acceptIncomingCall(callSession, false);
            }}
          >
            <MdPhoneInTalk />
          </IconButton>
        ))}
      {!callSession.isCaller ? (
        <IconButton rounded="100%" size="lg" colorPalette="danger" onClick={() => rejectIncomingCall(callSession)}>
          <FaPhoneSlash />
        </IconButton>
      ) : (
        <IconButton rounded="100%" size="lg" colorPalette="danger" onClick={() => hangUpCall(callSession)}>
          <FaPhoneSlash />
        </IconButton>
      )}
    </Flex>
  );
};

export default PhoneCallRinging;
