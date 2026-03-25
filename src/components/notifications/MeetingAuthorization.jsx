import { useEffect, useRef } from "react";
import { toaster } from "../ui/toaster";
import { FaCheck, FaBan } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../services/WazoProvider";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";

const MeetingAuthorization = () => {
    // requirements
  const { t } = useTranslation();
  const toastIdRef = useRef();

  // api
  const {
    meetingNotification,
    setMeetingNotification,
    meetingRoom,
    meetingAuthorizationAccept,
    meetingAuthorizationReject,
    setMeetings,
    setMeeting,
  } = useWazo();

  // close toaster
  const close = () => {
    if (toastIdRef.current) {
      toaster.dismiss(toastIdRef.current);
    }
  };

  // ----- Utils: remove authorization from state -----
  const removeAuthorizationFromState = (meetingUuid, authorizationUuid) => {
    setMeetings((prev) =>
      prev.map((m) =>
        m.uuid === meetingUuid
          ? {
              ...m,
              pendingAuthorizations: (m.pendingAuthorizations || []).filter(
                (a) => a.uuid !== authorizationUuid
              ),
            }
          : m
      )
    );

    setMeeting((prev) => {
      if (!prev || prev.uuid !== meetingUuid) return prev;

      return {
        ...prev,
        pendingAuthorizations: (prev.pendingAuthorizations || []).filter(
          (a) => a.uuid !== authorizationUuid
        ),
      };
    });
  };

  // Guest Accept
  const guestAccept = async () => {
    await meetingAuthorizationAccept(meetingRoom, meetingNotification);
    removeAuthorizationFromState(
      meetingNotification.meeting_uuid,
      meetingNotification.uuid
    );
    close();
  };

  // Guest Reject
  const guestReject = async () => {
    await meetingAuthorizationReject(meetingRoom, meetingNotification);
    removeAuthorizationFromState(
      meetingNotification.meeting_uuid,
      meetingNotification.uuid
    );
    close();
  };

  // toaster notification
  useEffect(() => {
    if (meetingNotification && meetingRoom) {
      toastIdRef.current = toaster.create({
        type: "info",
        duration: 10000,
        closable: true,
        title: t("meetings.notification_title"),
        description: (
          <HStack justifyContent="space-between">
            <Text>{meetingNotification.guest_name}</Text>
            <Box>
                <IconButton
                variant="ghost"
                colorPalette="danger"
                onClick={guestReject}
                >
                <FaBan />
                </IconButton>
                <IconButton
                variant="ghost"
                colorPalette="secondary"
                onClick={guestAccept}
                >
                <FaCheck />
                </IconButton>

            </Box>
          </HStack>
        ),
      });

      setMeetingNotification(null);
    }
  }, [meetingNotification]);

  return null;
};

export default MeetingAuthorization;
