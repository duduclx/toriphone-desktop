import { Box, HStack, VStack, IconButton, Text, Flex } from "@chakra-ui/react";
import { FaPhoneAlt, FaVideo, FaCommentAlt, FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import UserStateBadge from "../../../utils/UserStateBadge";

import { useWazo } from "../../../services/WazoProvider";

const PhoneSidebarFavs = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { contactsFavorites, contactsFavoritesRemove, call, usersPresence, chatRoomCreate, setAppCurrentPage } =
    useWazo();

  return (
    <>
      {contactsFavorites.length === 0 ? (
        <Box
          bg="bgSecondary"
          borderRadius="8px"
          my="2"
          mr="2"
          minH="14"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text>{t("phone.favorites_empty")}</Text>
        </Box>
      ) : (
        <Flex w="100%" flexDirection="column" overflowY="auto" pl="4" pt="2" mt="4" className="hide-scrollbar">
          {contactsFavorites.map((person, index) => (
            <Box key={index} h="auto">
              <Box position="relative" bg="bgElevated" borderRadius="8px" my="2" mr="2" p="2" minH="14">
                {person.backend === "wazo" && <UserStateBadge userinfo={usersPresence[person.uuid]} />}
                <Flex flexDirection="row" justifyContent="space-between" flexWrap="wrap">
                  <VStack>
                    <Text ml="4" truncate>
                      {person.name}
                    </Text>
                    <Text as="sub" alignSelf="flex-start" ml="4">
                      {person.number}
                    </Text>
                  </VStack>

                  <HStack pt="3" ml="auto">
                    <IconButton
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAppCurrentPage("phone");
                        const cleanNumber = person.number.replaceAll(" ", "");
                        call(cleanNumber, false);
                      }}
                    >
                      <FaPhoneAlt />
                    </IconButton>
                    {person.backend === "wazo" && (
                      <>
                        <IconButton
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setAppCurrentPage("phone");
                            call(person.number, true);
                          }}
                        >
                          <FaVideo />
                        </IconButton>
                        <IconButton
                          variant="ghost"
                          size="sm"
                          onClick={async () => {
                            const chatRoom = await chatRoomCreate("", [{ uuid: person.uuid }]);
                            setAppCurrentPage("chat");
                          }}
                        >
                          <FaCommentAlt />
                        </IconButton>
                      </>
                    )}
                    <IconButton
                      variant="ghost"
                      size="sm"
                      color="yellow.400"
                      onClick={() => contactsFavoritesRemove(person)}
                    >
                      <FaStar />
                    </IconButton>
                  </HStack>
                </Flex>
              </Box>
            </Box>
          ))}
        </Flex>
      )}
    </>
  );
};

export default PhoneSidebarFavs;
