import { Box, Flex, Avatar, Text, IconButton, Spacer } from "@chakra-ui/react";
import { FaPhoneAlt, FaVideo, FaCommentAlt, FaMobileAlt, FaPaperPlane, FaStar } from "react-icons/fa";

import { pickPalette } from "../../../ui";
import { useWazo } from "../../../services/WazoProvider";
import UserStateBadge from "../../../utils/UserStateBadge";
import FavoritesInfos from "./FavoritesInfos";

const FavoritesCard = ({ person, index }) => {
  // api
  const { call, contactsFavoritesRemove, usersPresence, chatRoomCreate, setAppCurrentPage } = useWazo();

  const isWazo = person.backend === "wazo";
  const hasPhone = person.number.length > 1;
  const hasMail = person.email.length > 1;
  // mobile turnaround
  if (person.mobile == undefined || person.mobile == false) {
    person.mobile = person.numbers[1]?.number || null;
  }
  const hasMobile = person.mobile !== null;
  //const hasFax = person.birthday.length > 1 //il faut pour cela modifier le contact phonebook ou internal lors de sa creation

  // mail
  const handleEmailClick = (email) => {
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
  };

  const separateName = person.separateName();

  return (
    <Box key={index} width="330px" height="180px" margin="2px" bg="bgElevated" borderRadius="8px" m="2" p="4">
      <Flex flexDirection="column" justifyContent="space-between" height="100%">
        <Flex justifyContent="flex-start" gap="2">
          <Avatar.Root size="2xl" colorPalette={pickPalette(person.name)}>
            <Avatar.Fallback name={person.name}/>
          </Avatar.Root>
          <Box width="50%" ml="4">
            <Text truncate>{separateName.firstName}</Text>
            <Text truncate>{separateName.lastName}</Text>
            <Text fontSize="xs" truncate>
              {person.email}
            </Text>
            <Text as="sub">{person.number}</Text>
          </Box>
          <Spacer />
          <Box>
            <FavoritesInfos person={person} />
          </Box>
        </Flex>

        <Flex justifyContent="space-between" alignItems="baseline">
          <Box>
            {hasPhone && (
              <IconButton variant="ghost" size="md" onClick={() => call(person.number, false)}>
                <FaPhoneAlt />
              </IconButton>
            )}
            {isWazo && (
              <>
                <IconButton
                  variant="ghost"
                  size="md"
                  onClick={() => {
                    call(person.number, true);
                    setAppCurrentPage("phone");
                  }}
                >
                  <FaVideo />
                </IconButton>
                <IconButton
                  variant="ghost"
                  size="md"
                  onClick={async () => {
                    const chatRoom = await chatRoomCreate("", [{ uuid: person.uuid }]);
                    setAppCurrentPage("chat");
                  }}
                >
                  <FaCommentAlt />
                </IconButton>
              </>
            )}
            {hasMobile && (
              <IconButton
                variant="ghost"
                size="md"
                onClick={() => {
                  const cleanNumber = person.mobile.replaceAll(" ", "");
                  call(cleanNumber, false);
                  setAppCurrentPage("phone");
                }}
              >
                <FaMobileAlt />
              </IconButton>
            )}
            {hasMail && (
              <IconButton variant="ghost" size="md" onClick={() => handleEmailClick(person.email)}>
                <FaPaperPlane />
              </IconButton>
            )}
            <IconButton variant="ghost" size="md" color="yellow.400" onClick={() => contactsFavoritesRemove(person)}>
              <FaStar />
            </IconButton>
          </Box>
          {isWazo && <UserStateBadge userinfo={usersPresence[person.uuid]} asNotif={false} />}
        </Flex>
      </Flex>
    </Box>
  );
};

export default FavoritesCard;
