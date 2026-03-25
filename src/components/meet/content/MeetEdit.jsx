import { useEffect, useState } from "react";
import { Dialog, Field, Flex, HStack, Switch, Text } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";
import { ButtonEditUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";
import ComboboxAsyncUsers from "./ComboboxAsyncUsers";

const MeetEdit = ({ open, onClose }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { meeting, meetingUpdate, userGetByUuid, meetingsGet } = useWazo();

  // value
  const [meetingUpdated, setMeetingUpdated] = useState({});
  const [owners, setOwners] = useState([]);
  const [ownersUuid, setOwnersUuid] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
    try {
      const promises = meeting.ownerUuids.map(uuid => userGetByUuid(uuid));
      const results = await Promise.all(promises);
      setOwners(results);
      setOwnersUuid(results.map(u => u.uuid));
    } catch (error) {
      // console.error("Failed to load meeting owners:", error);
    }
  };
  setMeetingUpdated(meeting);
  fetchUsers();
  }, [meeting]);

  // submit
  const submit = async () => {
    const res = await meetingUpdate(meeting, {
      name: meetingUpdated.name,
      requireAuthorization: meetingUpdated.requireAuthorization,
      persistent: meetingUpdated.persistent,
      owner_uuids: ownersUuid,
    });
    /*
    mettre un toaster et recharger
    */
   await meetingsGet();
   toaster.create({
        type: "success",
        title: t("meetings.edit_success_title"),
        description: t("meetings.edit_success_description"),
        duration: 3000,
        closable: true
      });
   onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="bgDefault">
          <Dialog.Header alignSelf="center">
            <Dialog.Title>
              <Text>{t("meetings.edit_title")} {meeting.name}</Text>
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            <Flex flexDirection="column" gap="4">
              <Field.Root>
                <Field.Label>{t("meetings.name")}</Field.Label>
                <InputUi 
                value={meetingUpdated.name}
                onChange={(e) => setMeetingUpdated({...meetingUpdated, name: e.target.value})}/>
              </Field.Root>
              <Field.Root>
                <Field.Label>{t("meetings.admins")}</Field.Label>
                <ComboboxAsyncUsers owners={owners} setOwners={setOwners} setOwnersUuid={setOwnersUuid}/>
              </Field.Root>
              <HStack justifyContent="center">
                <Text>{t("meetings.persistent_false")}</Text>
                <Switch.Root
                  colorPalette="cyan"
                  checked={meetingUpdated.persistent}
                  onCheckedChange={(e) =>
                    setMeetingUpdated({
                      ...meetingUpdated,
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
                  checked={meetingUpdated.requireAuthorization}
                  onCheckedChange={(e) =>
                    setMeetingUpdated({
                      ...meetingUpdated,
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
            <ButtonEditUi onClick={() => submit()} />
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default MeetEdit;
