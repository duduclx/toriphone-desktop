import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

const MeetJoinUser = ({ meeting, params, guestName, guestUuid, waiting, setWaiting }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const {
    guestMeetingAuthorizationRequest,
    guestMeetingAuthorizationGet,
    meetingConnect,
  } = useWazo();

  const joinMeetingUser = async () => {
    setWaiting(true);
    // Cas simple : pas besoin d'autorisation
    if (!meeting.requireAuthorization) {
      await meetingConnect(meeting);
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
          await meetingConnect(meeting);
          setWaiting(false);
        }
      } catch (err) {
        // console.error("Polling error:", err);
      }
    }, pollInterval);
  };

  return (
    <Flex w="100%" h="100vh" justify="center" align="center" direction="column" gap="6" bg="bgDefault">
      <Flex flexDirection="column" bg="bgElevated" gap="8" p="8" borderRadius="16px">
      {meeting && (
        <Box width="100%" textAlign="center" mt="8">
          <Text fontSize="3xl" fontWeight="bold">
            {meeting.name}
          </Text>
        </Box>
      )}
      <Box>
        <Text fontSize="lg" color="green.400">
          {t("meetings.join_as")} <strong>{guestName}</strong>
        </Text>
      </Box>
      {waiting ? (
        <Button colorPalette="primary" size="lg" mt="4" disabled>
          {t("meetings.join_waiting")}
        </Button>
      ) : (
        <Button colorPalette="primary" size="lg" onClick={joinMeetingUser} mt="4" disabled={!guestName.trim()}>
          {t("meetings.join")}
        </Button>
      )}
      </Flex>
    </Flex>
  );
};

export default MeetJoinUser;
