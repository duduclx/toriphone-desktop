import { Box, Flex, Avatar, Text, IconButton, Spacer, useDisclosure } from "@chakra-ui/react";
import { FaPhoneAlt, FaPaperPlane, FaStar } from "react-icons/fa";

import { IconButtonDeleteUi, IconButtonEditUi, pickPalette } from "../../../ui";
import { useWazo } from "../../../services/WazoProvider";

import PersonalRemove from "./PersonalRemove";
import PersonalEdit from "./PersonalEdit";

const PersonalCard = ({ person, index }) => {
  // requirements
  const { open, onOpen, onClose } = useDisclosure();
  const { open: openRemove, onOpen: onOpenRemove, onClose: onCloseRemove } = useDisclosure();

  // api
  const { call, contactsFavorites, contactsFavoritesAdd, contactsFavoritesRemove } = useWazo();

  // status
  const isFavorited = contactsFavorites.some((favorite) => favorite.sourceId === person.sourceId);

  const hasPhone = person.number.length > 1;
  // hasMobile = person.mobile = undefined car ça n'esite pas dans la fiche contact personal
  const hasMail = person.email.length > 1;

  // mail
  const handleEmailClick = (email) => {
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
  };

  const separateName = person.separateName();

  return (
    <Box key={index} width="330px" height="180px" margin="2px" bg="bgElevated" borderRadius="8px" m="2" p="4">
      <Flex flexDirection="column" justifyContent="space-between" height="100%" >
        <Flex justifyContent="flex-start" gap="2">
          <Avatar.Root size="2xl" colorPalette={pickPalette(person.name)}>
            <Avatar.Fallback name={person.name} />
          </Avatar.Root>
          <Box ml="4" width="50%">
            <Text truncate>{separateName.firstName}</Text>
            <Text truncate>{separateName.lastName}</Text>
            <Text fontSize="xs" truncate>
              {person.email}
            </Text>
            <Text as="sub">{person.number}</Text>
          </Box>
          <Spacer />
          <IconButtonEditUi onClick={() => onOpen()} />
        </Flex>
        <Flex justifyContent="space-between" alignItems="baseline">
          {/* doit être en bas du flex parent */}
          <Box>
            {hasPhone && (
              <IconButton variant="ghost" onClick={() => {
                const cleanNumber = person.number.replaceAll(" ", "");
                call(cleanNumber, false)
                }}>
                <FaPhoneAlt />
              </IconButton>
            )}
            {hasMail && (
              <IconButton variant="ghost" onClick={() => handleEmailClick(person.email)}>
                <FaPaperPlane />
              </IconButton>
            )}
            <IconButton
              variant="ghost"
              color={isFavorited ? "yellow.400" : "white"}
              onClick={() => (isFavorited ? contactsFavoritesRemove(person) : contactsFavoritesAdd(person))}
            >
              <FaStar />
            </IconButton>
          </Box>
          <Box>
            <IconButtonDeleteUi onClick={() => onOpenRemove()} />
          </Box>
        </Flex>
      </Flex>
      <PersonalEdit person={person} open={open} onClose={onClose} />
      <PersonalRemove person={person} open={openRemove} onClose={onCloseRemove} />
    </Box>
  );
};

export default PersonalCard;
