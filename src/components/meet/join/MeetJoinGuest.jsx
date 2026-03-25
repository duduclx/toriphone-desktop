import { Box, Button, Field, Flex, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { InputUi } from "../../../ui";
import logo from "/toriLogoApp.svg";

import { useWazo } from "../../../services/WazoProvider";

const MeetJoinGuest = ({ meeting, params, guestUuid, guestName, setGuestName, waiting, setWaiting }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const {
    guestMeetingAuthorizationRequest,
    guestMeetingAuthorizationGet,
    guestMeetingConnect,
  } = useWazo();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      joinMeetingGuest();
    }
  };

  const joinMeetingGuest = async () => {
    setWaiting(true);
    // Cas simple : pas besoin d'autorisation
    if (!meeting.requireAuthorization) {
      const decoded = atob(meeting.guestSipAuthorization);
      const [username, secret] = decoded.split(":");

      const credentials = { username, secret };

      await guestMeetingConnect(meeting, params.server, guestName, credentials);
      setWaiting(false);
      return;
    }

    // Cas où l'autorisation est requise
    const res = await guestMeetingAuthorizationRequest(params.server, params.uuid, guestUuid, guestName);

    // Polling toutes les 10 secondes
    const pollInterval = 3_000;
    const intervalId = setInterval(async () => {
      try {
        const auth = await guestMeetingAuthorizationGet(
          params.server,
          res.meeting_uuid,
          res.guest_uuid,
          res.uuid
        );

        if (auth.status === "accepted") {
          clearInterval(intervalId);

          const decoded = atob(auth.guest_sip_authorization);
          const [username, secret] = decoded.split(":");

          const credentials = { username, secret };

          // Connecter au WebRTC Guest
          await guestMeetingConnect(meeting, params.server, guestName, credentials);
          setWaiting(false);
        }
      } catch (err) {
        // console.error("Polling error:", err);
      }
    }, pollInterval);
  };

  return (
    <Flex w="100%" h="100vh" justify="center" align="center" direction="column" gap="6" bg="bgDefault">
      <Image alt="Toriphone logo" src={logo} width="400px" />
      <Flex flexDirection="column" bg="bgElevated" gap="8" p="8" borderRadius="16px">
        {meeting && (
          <Box width="100%" textAlign="center">
            <Text fontSize="3xl" fontWeight="bold">
              {meeting.name}
            </Text>
          </Box>
        )}
        <Box width="300px">
          <Field.Root>
            <Field.Label>{t("meetings.join_name")}</Field.Label>
            <InputUi
              placeholder={t("meetings.join_name")}
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </Field.Root>
        </Box>
        {waiting ? (
          <Button colorPalette="primary" size="lg" mt="4" disabled>
            {t("meetings.join_waiting")}
          </Button>
        ) : (
          <Button colorPalette="primary" size="lg" onClick={joinMeetingGuest} mt="4" disabled={!guestName.trim()}>
            {t("meetings.join")}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default MeetJoinGuest;
