import { useRef } from "react";
import { Box, Flex, Avatar, Text, IconButton, useDisclosure, Spacer } from "@chakra-ui/react";
import { FaPhoneAlt, FaMobileAlt, FaPaperPlane, FaFax, FaStar } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";
import { pickPalette } from "../../../ui";
import PhonebookInfos from "./PhonebookInfos";
import Fax from "../../header/fax/Fax";

const PhonebookCard = ({ person, index }) => {
  // api
  const { call, setAppCurrentPage, contactsFavoritesAdd, contactsFavoritesRemove } = useWazo();

  const isFavorited = person.favorited;
  const hasPhone = person.phone !== null;
  const hasMail = person.email !== null;
  const hasMobile = person.mobile_phone !== null;
  const hasFax = person.fax !== null;

  // fax
  const { isOpen: isOpenFax, onOpen: onOpenFax, onClose: onCloseFax } = useDisclosure();
  const faxRef = useRef();

  // mail
  const handleEmailClick = (email) => {
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
  };

  return (
    <Box key={index} width="330px" height="180px" margin="2px" bg="bgElevated" borderRadius="8px" m="2" p="4">
      <Flex flexDirection="column" justifyContent="space-between" height="100%">
        <Flex justifyContent="flex-start" gap="2">
          <Avatar.Root size="2xl" colorPalette={pickPalette(person.name)}>
            <Avatar.Fallback name={person.name}/>
          </Avatar.Root>
          <Box width="50%" ml="4">
            <Text truncate>{person.firstname}</Text>
            <Text truncate>{person.lastname}</Text>
            <Text fontSize="xs" truncate>
              {person.email}
            </Text>
            <Text as="sub">{person.phone}</Text>
          </Box>
          <Spacer />
          <Box>
            <PhonebookInfos person={person} />
          </Box>
        </Flex>
        <Flex justifyContent="space-between" alignItems="baseline">
          <Box>
            {hasPhone && (
              <IconButton variant="ghost" onClick={() => {
                const cleanNumber = person.phone.replaceAll(" ", "");
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
            {hasMobile && (
              <IconButton variant="ghost" onClick={() => {
                const cleanNumber = person.mobile_phone.replaceAll(" ", "");
                call(cleanNumber, false)
                }}>
                <FaMobileAlt />
              </IconButton>
            )}
            {hasFax && (
              <IconButton variant="ghost" onClick={() => onOpenFax()}>
                <FaFax />
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
        </Flex>
      </Flex>
      <Fax faxRef={faxRef} isOpenFax={isOpenFax} onCloseFax={onCloseFax} number={person.fax} />
    </Box>
  );
};

export default PhonebookCard;
