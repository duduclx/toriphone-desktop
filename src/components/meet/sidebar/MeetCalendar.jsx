import { Badge, Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaPlay } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const MeetCalendar = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { user } = useAuth();
  const { configMeetingCalendar, meetingConnect, setMeeting, setMeetingRoute } = useWazo();

  // garde-fous
  const meetingCalendarEnabled = configMeetingCalendar?.configuration?.meetingCalendar === true;

  if (!meetingCalendarEnabled || !user) {
    return null;
  }

  const calendars = configMeetingCalendar?.configuration?.calendars ?? [];

  // filtrage des réunions visibles par l'utilisateur
  const visibleMeetings = calendars.filter((meeting) => {
    const isOwner = meeting?.ownerUuids?.includes(user.uuid);
    const isGuest = meeting?.guestUuids?.includes(user.uuid);

    return isOwner || isGuest;
  });

  if (visibleMeetings.length === 0) {
    return null;
  }

  const meetingStart = (meeting) => {
    const isOwner = meeting?.ownerUuids?.includes(user.uuid);
    const isGuest = meeting?.guestUuids?.includes(user.uuid);

    // 🎯 OWNER → connexion directe
    if (isOwner) {
      setMeeting(meeting);
      meetingConnect(meeting);
      return;
    }

    // 🎯 GUEST → navigation vers l'URL de meeting
    if (isGuest) {
      const meetingUuid = meeting.uuid;
      const newUrl = `/meeting?server=${user.server}&uuid=${meetingUuid}`;
      window.history.pushState({}, "", newUrl);
      const isMeetingRoute = window.location.pathname === "/meeting";
      setMeetingRoute(isMeetingRoute);
      return;
    }
  };

  return (
    <Flex flex="1" flexDirection="column" gap="2">
      <Box py="4" textAlign="center">
        <Text mb="4" as="b">
          {t("meetings.calendar_title")}
        </Text>
      </Box>

      {visibleMeetings.map((meeting) => {
        const isOwner = meeting?.ownerUuids?.includes(user.uuid);
        const isGuest = meeting?.guestUuids?.includes(user.uuid);
        return (
          <Box key={meeting.uuid} p="3" borderRadius="md" bg="bgElevated">
            <HStack>
              <Badge colorPalette={isOwner ? "primary" : "secondary"} variant="subtle">
                {isOwner ? t("owner") : t("guest")}
              </Badge>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Box>
                <Text fontWeight="bold" truncate>
                  {meeting.name}
                </Text>

                {meeting.date && (
                  <Text fontSize="sm" opacity={0.8}>
                    {new Date(meeting.date).toLocaleString()}
                  </Text>
                )}
              </Box>
              <IconButton variant="ghost" colorPalette="primary" onClick={() => meetingStart(meeting)}>
                <FaPlay />
              </IconButton>
            </HStack>
          </Box>
        );
      })}
    </Flex>
  );
};

export default MeetCalendar;
