import { Box, Flex, Avatar, Text, IconButton, Spacer } from "@chakra-ui/react";
import { FaPhoneAlt, FaVideo, FaCommentAlt, FaPaperPlane, FaStar } from "react-icons/fa";

import { pickPalette } from "../../../ui";
import { useWazo } from "../../../services/WazoProvider";
import UserStateBadge from "../../../utils/UserStateBadge";
import InternalsInfos from "./InternalsInfos";

const InternalsCard = ({ person, index }) => {
  // api
  const {
    call,
    contactsFavorites,
    contactsFavoritesRemove,
    contactsFavoritesAdd,
    usersPresence,
    chatRoomCreate,
    setAppCurrentPage,
  } = useWazo();

  const isFavorited = contactsFavorites.some((favorite) => favorite.sourceId === person.sourceId);

  // mail turnaround
  if (person.email == undefined) {
    person.email = person.emails[0]?.email || null;
  }
  // mail
  const hasMail = person.email.length > 1;
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
            <InternalsInfos person={person} />
          </Box>
        </Flex>
        <Flex justifyContent="space-between" alignItems="baseline">
          <Box>
            <IconButton variant="ghost" onClick={() => call(person.number, false)}>
              <FaPhoneAlt />
            </IconButton>
            <IconButton
              variant="ghost"
              onClick={() => {
                call(person.number, true);
                setAppCurrentPage("phone");
              }}
            >
              <FaVideo />
            </IconButton>
            <IconButton
              variant="ghost"
              onClick={async () => {
                const chatRoom = await chatRoomCreate("", [{ uuid: person.uuid }]);
                setAppCurrentPage("chat");
              }}
            >
              <FaCommentAlt />
            </IconButton>
            {hasMail && (
              <IconButton variant="ghost" size="md" onClick={() => handleEmailClick(person.email)}>
                <FaPaperPlane />
              </IconButton>
            )}
            <IconButton
              variant="ghost"
              size="md"
              color={isFavorited ? "yellow.400" : "white"}
              onClick={() => (isFavorited ? contactsFavoritesRemove(person) : contactsFavoritesAdd(person))}
            >
              <FaStar />
            </IconButton>
          </Box>
          <UserStateBadge userinfo={usersPresence[person.uuid]} asNotif={false} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default InternalsCard;
