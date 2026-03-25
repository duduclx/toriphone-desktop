import { useEffect, useState } from "react";
import { Dialog, Field, Flex, HStack, Switch, Text } from "@chakra-ui/react";
import { ButtonAddUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";

const MeetAdd = ({ open, onClose }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { meetingCreate } = useWazo();

  // values
  const [meeting, setMeeting] = useState({
    name: "",
    requireAuthorization: false,
    persistent: false,
  });

  // errors
  const [isError, setIsError] = useState(false);

  // submit
  const onCreateMeeting = async () => {
    if (meeting.name.length > 0) {
      const meet = await meetingCreate(meeting);
      if (meet) {
        setMeeting({
          name: "",
          requireAuthorization: false,
          persistent: false,
        });
        setIsError(false);
        onClose();
      }
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (meeting.name.length > 0) {
      setIsError(false);
    }
  }, [meeting]);

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="bgDefault">
          <Dialog.Header alignSelf="center">
            <Dialog.Title>{t("meetings.add_title")}</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            <Flex flexDirection="column" gap="4">
              <Field.Root invalid={isError}>
                <Field.Label>{t("meetings.name")}</Field.Label>
                <InputUi
                  variant="filled"
                  placeholder={t("meetings.name_placeholder")}
                  value={meeting.name}
                  onChange={(e) => setMeeting({ ...meeting, name: e.target.value })}
                />
                <Field.ErrorText>{t("meetings.name_error")}</Field.ErrorText>
              </Field.Root>
              <HStack justifyContent="center">
                <Text>{t("meetings.persistent_false")}</Text>
                <Switch.Root
                  colorPalette="cyan"
                  checked={meeting.persistent}
                  onCheckedChange={(e) =>
                    setMeeting({
                      ...meeting,
                      persistent: e.checked,
                    })
                  }
                >
                  <Switch.HiddenInput />
                  <Switch.Control />
                </Switch.Root>
                <Text>{t("meetings.persistent_true")}</Text>
              </HStack>
              <HStack justifyContent="center">
                <Text>{t("meetings.restricted_false")}</Text>
                <Switch.Root
                  colorPalette="cyan"
                  checked={meeting.requireAuthorization}
                  onCheckedChange={(e) =>
                    setMeeting({
                      ...meeting,
                      requireAuthorization: e.checked,
                    })
                  }
                >
                  <Switch.HiddenInput />
                  <Switch.Control />
                </Switch.Root>
                <Text>{t("meetings.restricted_true")}</Text>
              </HStack>
            </Flex>
          </Dialog.Body>
          <Dialog.Footer>
            <ButtonAddUi onClick={() => onCreateMeeting()} />
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default MeetAdd;
