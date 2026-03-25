import { useEffect, useState } from "react";
import { Box, Button, Dialog, Field, Flex, Text } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";
import { FaClipboard } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ComboboxAsyncUsers from "./ComboboxAsyncUsers";
import DateTimePicker from "../helpers/DateTimePicker";

import { useWazo } from "../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const MeetShare = ({ open, onClose, meeting }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { configMeetingCalendar, configMeetingCalendarGet, configMeetingCalendarUpdate } = useWazo();
  const { user } = useAuth();

  const meetingCalendarEnabled = configMeetingCalendar?.configuration?.meetingCalendar === true;
  const generatedLink = `https://${meeting.uri}/meeting?server=${user.server}&uuid=${meeting.uuid}`;

  // values
  const [guests, setGuests] = useState([]);
  const [guestsUuids, setGuestsUuid] = useState([]);
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (!meeting?.uuid) return;

    const calendars = configMeetingCalendar?.configuration?.calendars ?? [];

    const existingMeeting = calendars.find((m) => m.uuid === meeting.uuid);

    // load values if exist
    if (existingMeeting) {
      setGuests(existingMeeting.guests ?? []);
      setGuestsUuid(existingMeeting.guestUuids ?? []);
      setDate(existingMeeting.date ?? null);
    } else {
      // reset si pas encore partagé
      setGuests([]);
      setGuestsUuid([]);
      setDate(null);
    }
  }, [meeting, configMeetingCalendar]);

  // meeting Share
  const meetingshare = async () => {
    const updateMeeting = {
      ...meeting,
      guests,
      guestUuids: guestsUuids,
      date,
    };

    const calendars = configMeetingCalendar?.configuration?.calendars ?? [];

    // 🔍 vérifier si le meeting existe déjà
    const index = calendars.findIndex((m) => m.uuid === meeting.uuid);

    let updatedCalendars;

    if (index === -1) {
      // ➕ nouveau meeting
      updatedCalendars = [...calendars, updateMeeting];
    } else {
      // ✏️ édition existante
      updatedCalendars = calendars.map((m) => (m.uuid === meeting.uuid ? updateMeeting : m));
    }

    const updatedConfigMeetingCalendar = {
      ...configMeetingCalendar,
      configuration: {
        ...configMeetingCalendar.configuration,
        calendars: updatedCalendars,
      },
    };

    await configMeetingCalendarUpdate(updatedConfigMeetingCalendar);
    await configMeetingCalendarGet();
    onClose();
    toaster.create({
      type: "success",
      title: "réunion partagée",
      description: "La réunion à été partagée avec succès !",
      duration: 3000,
      closable: true,
    });
  };

  // si configMeetingCalendar n'est pas actif, ne proposer que le lien
  // ajouter la possibilité de copier le lien

  const copyLink = async () => {
    await navigator.clipboard.writeText(generatedLink);
    toaster.create({
      type: "success",
      description: t("meetings.copy_success"),
      duration: 3000,
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="bgDefault">
          <Dialog.Header alignSelf="center">
            <Dialog.Title>
              <Text textAlign="center">{t("meetings.share_title")}</Text>
              <Text textAlign="center">{meeting.name}</Text>
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            <Flex flexDirection="column" gap="4">
              {meetingCalendarEnabled && 
              <>
                <Field.Root>
                  <Field.Label>{t("meetings.share_guests")}</Field.Label>
                  <ComboboxAsyncUsers owners={guests} setOwners={setGuests} setOwnersUuid={setGuestsUuid} />
                </Field.Root>
                <Field.Root>
                  <Field.Label>{t("meetings.share_date")}</Field.Label>
                  <DateTimePicker value={date} onChange={setDate} />
                </Field.Root>
              </>
              }
              <Box textAlign="center">
              <Button colorPalette="primary" onClick={copyLink}>
                <FaClipboard /> {t("meetings.copy_link")}
              </Button>
              </Box>
            </Flex>
          </Dialog.Body>
          <Dialog.Footer>
            {meetingCalendarEnabled && 
            <Button colorPalette="primary" onClick={meetingshare}>
              {t("meetings.share_submit")}
            </Button>
            }
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default MeetShare;
