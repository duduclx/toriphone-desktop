import { useState } from "react";
import { Box, CloseButton, Flex, HStack, IconButton, InputGroup, Popover, Portal, Text } from "@chakra-ui/react";
import { FaSearch, FaPhoneAlt, FaCommentAlt, FaVideo, FaStar } from "react-icons/fa";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import UserStateBadge from "../../../utils/UserStateBadge";
import { useWazo } from "../../../services/WazoProvider";
import { useAuth } from "toriphone-auth";

const HeaderSearch = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { user } = useAuth();
  const {
    call,
    contactsFavoritesAdd,
    contactsFavoritesRemove,
    searchUsers,
    usersPresence,
    chatRoomCreate,
    setAppCurrentPage,
  } = useWazo();

  // states
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [open, setOpen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getSearch();
    }
  };

  const getSearch = async () => {
    setOpen(true);
    const result = await searchUsers(search, user);
    setSearchResult(result);
  };

  return (
    <Box p="8" w="450px" h="12" display="flex" alignItems="center" justifyContent="flex-start">
      <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)} positioning={{ placement: "bottom-end" }} onPointerDownOutside={() => setOpen(false)}>
        <InputGroup
          endElement={
            <Popover.Trigger asChild>
              <IconButton variant="ghost" onClick={getSearch}>
                <FaSearch />
              </IconButton>
            </Popover.Trigger>
          }
        >
          <InputUi
            variant="filled"
            placeholder={t("search.placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </InputGroup>
        <Portal>
          <Popover.Positioner>
              <Popover.Content bg="bgDefault">
                <Popover.Header>
                  <Flex justify="flex-end" align="center" width="100%">
                  <Popover.CloseTrigger asChild>
                    <CloseButton variant="ghost" size="xs" />
                  </Popover.CloseTrigger>
                </Flex>
                </Popover.Header>
                <Popover.Body>
                  <Flex flexDirection="column" gap="2">
                    {searchResult.length == 0 && 
                    <Box textAlign="center">
                      <Text fontWeight="bold" fontSize="md">{t("search.no_result")}</Text>
                    </Box>
                    }
                    {searchResult.length > 0 && searchResult.map((person, index) => (
                      <div key={index}>
                          <Box key={index} p="4" bg="bgElevated" borderRadius="8px">
                            <Box position="relative">
                              {usersPresence[person.uuid] && (
                                <UserStateBadge userinfo={usersPresence[person.uuid]} />
                              )}
                              <Box textAlign="left" pl="2">
                                <Text>{person.name}</Text>
                                <HStack>
                                  <Text mr="2">{person.number}</Text>
                                  <IconButton variant="ghost" size="sm" onClick={() => call(person.number, false)}>
                                    <FaPhoneAlt />
                                  </IconButton>
                                  {person.backend == "wazo" && (
                                    <>
                                      <IconButton
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          call(person.number, true);
                                          setAppCurrentPage("phone");
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
                                    color={person.favorited ? "yellow.400" : ""}
                                    onClick={() => {
                                      person.favorited ? contactsFavoritesRemove(person) : contactsFavoritesAdd(person);
                                      person.favorited = !person.favorited;
                                    }}
                                  >
                                    <FaStar />
                                  </IconButton>
                                </HStack>
                              </Box>
                            </Box>
                          </Box>
                      </div>
                    ))}
                  </Flex>
                </Popover.Body>
              </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </Box>
  );
};

export default HeaderSearch;
