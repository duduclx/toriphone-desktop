import { useEffect, useState } from "react";
import { Box, Flex, HStack, IconButton, Tag, Text, useDisclosure } from "@chakra-ui/react";
import { FaPlay, FaShare } from "react-icons/fa";
import { FaShield, FaRegClock } from "react-icons/fa6";
import { IconButtonDeleteUi, IconButtonEditUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../services/WazoProvider";
import MeetDelete from "./MeetDelete";
import MeetEdit from "./MeetEdit";
import MeetShare from "./MeetShare";

const MeetCard = ({ meeting, index }) => {
  // requirements
  const { t } = useTranslation();
  const { open: openDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { open: openEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { open: openShare, onOpen: onOpenShare, onClose: onCloseShare } = useDisclosure();

  // api
  const { meetingConnect, setMeeting, meetingUpdate, userGetByUuid } = useWazo();

  //values
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const promises = meeting.ownerUuids.map((uuid) => userGetByUuid(uuid));
        const results = await Promise.all(promises);
        setOwners(results);
      } catch (error) {
        // console.error("Failed to load meeting owners:", error);
      }
    };
    fetchUsers();
  }, []);

  // meeting start
  const meetingStart = () => {
    setMeeting(meeting);
    meetingConnect(meeting);
  };

  // meeting Edit
  const meetingEdit = () => {
    setMeeting(meeting);
    onOpenEdit();
  }

  // meeting Share
  const meetingshare = () => {
    onOpenShare();
  }

  return (
    <Flex
      key={index}
      flexDirection="column"
      width="400px"
      height="auto"
      margin="2px"
      position="relative"
      bg="bgElevated"
      borderRadius="8px"
      boxShadow="lg"
      m="2"
      p="4"
      justifyContent="space-between"
      gap="4"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Box textAlign="center" width="100%">
          <Text fontSize="2xl" fontWeight="bold" truncate>
            {meeting.name}
          </Text>
        </Box>
      </Flex>
      <Box>
        <Text>{t("meetings.number")} : {meeting.extension}</Text>
      </Box>
      <Box>
        <Text mb="4">{t("meetings.admins")} :</Text>
        <HStack wrap={"wrap"}>
          {owners.map((owner, index) => (
            <Tag.Root key={index} p="3" borderRadius="8px">
              <Tag.Label>{owner.name}</Tag.Label>
            </Tag.Root>
          ))}
        </HStack>
      </Box>
      <Flex gap="4" justifyContent="center">
        <IconButton variant="ghost" colorPalette="primary" onClick={() => meetingStart()}>
          <FaPlay />
        </IconButton>
        <IconButton variant="ghost" onClick={() => meetingshare()}>
          <FaShare />
        </IconButton>
        <IconButton
          variant="ghost"
          colorPalette={meeting.persistent ? "secondary" : "danger"}
          onClick={() =>
            meetingUpdate(meeting, {
              name: meeting.name,
              persistent: !meeting.persistent,
              requireAuthorization: meeting.requireAuthorization,
              ownerUuids: meeting.ownerUuids,
            })
          }
        >
          <FaRegClock />
        </IconButton>
        <IconButton
          variant="ghost"
          colorPalette={meeting.requireAuthorization ? "danger" : "secondary"}
          onClick={() =>
            meetingUpdate(meeting, {
              name: meeting.name,
              requireAuthorization: !meeting.requireAuthorization,
              persistent: meeting.persistent,
              ownerUuids: meeting.ownerUuids,
            })
          }
        >
          <FaShield />
        </IconButton>
        <IconButtonEditUi onClick={() => meetingEdit()} />
        <IconButtonDeleteUi onClick={() => onOpenDelete()} />
      </Flex>
      <MeetDelete open={openDelete} onClose={onCloseDelete} meeting={meeting} />
      <MeetEdit open={openEdit} onClose={onCloseEdit} />
      <MeetShare open={openShare} onClose={onCloseShare} meeting={meeting}/>
    </Flex>
  );
};

export default MeetCard;
