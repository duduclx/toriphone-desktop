import { Box, IconButton, Flex, Text } from "@chakra-ui/react";
import { FaBan, FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const MeetAuthorizations = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { meeting, meetingRoom, meetingAuthorizationAccept, meetingAuthorizationReject, setMeetings, setMeeting } =
    useWazo();
  const { user } = useAuth();

  // accept guest
  const guestAccept = async (authorization) => {
    await meetingAuthorizationAccept(meetingRoom, authorization);
    removeAuthorizationFromState(meeting.uuid, authorization.uuid);
  };

  // reject guest
  const guestReject = async (authorization) => {
    await meetingAuthorizationReject(meetingRoom, authorization);
    removeAuthorizationFromState(meeting.uuid, authorization.uuid);
  };

  // update meetings and meeting
  const removeAuthorizationFromState = (meetingUuid, authorizationUuid) => {
    setMeetings((prev) =>
      prev.map((m) =>
        m.uuid === meetingUuid
          ? {
              ...m,
              pendingAuthorizations: (m.pendingAuthorizations || []).filter((a) => a.uuid !== authorizationUuid),
            }
          : m,
      ),
    );

    setMeeting((prev) => {
      if (!prev || prev.uuid !== meetingUuid) return prev;

      return {
        ...prev,
        pendingAuthorizations: (prev.pendingAuthorizations || []).filter((a) => a.uuid !== authorizationUuid),
      };
    });
  };

  return (
    <Flex flexDirection="column" gap="4" alignItems="center" width="100%">
      {meeting.pendingAuthorizations && meeting.pendingAuthorizations.length > 0 && (
        <Flex flex="1" flexDirection="column" gap="4" width="100%">
          <Text p="2" fontSize="2xl" fontWeight="bold" truncate>
            {t("meetings.join_waiting_auth")}
          </Text>
          {meeting.pendingAuthorizations.map((authorization, index) => (
            <Flex
              key={index}
              mb="3"
              bg="bgElevated"
              p="4"
              borderRadius="16px"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Text fontWeight="bold">{authorization.guest_name}</Text>
              <Box>
                <IconButton variant="ghost" colorPalette="danger" onClick={() => guestReject(authorization)}>
                  <FaBan />
                </IconButton>
                <IconButton variant="ghost" colorPalette="secondary" onClick={() => guestAccept(authorization)}>
                  <FaCheck />
                </IconButton>
              </Box>
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default MeetAuthorizations;
