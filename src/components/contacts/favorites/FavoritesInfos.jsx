import { Flex, HStack, Popover, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { IconButtonMenuUi } from "../../../ui";

const FavoritesInfos = ({ person }) => {
  // requirements
  const { t } = useTranslation();

  const separateName = person.separateName();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButtonMenuUi />
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content bg="bgDefault" width="full" minWidth="330px">
          <Popover.Header alignSelf="center">
            <Popover.Title>{person.name}</Popover.Title>
          </Popover.Header>
          <Popover.Body>
            <Flex flexDirection="column" justifyContent="flex-start" gap="4">
              <HStack gap="2" align="flex-start">
                <Text fontWeight="bold" flex="0 0 100px">
                  {t("contacts.card_firstname")}
                </Text>
                <Text flex="1">{separateName.firstName}</Text>
              </HStack>
              <HStack gap="2" align="flex-start">
                <Text fontWeight="bold" flex="0 0 100px">
                  {t("contacts.card_lastname")}
                </Text>
                <Text flex="1">{separateName.lastName}</Text>
              </HStack>
              <HStack gap="2" align="flex-start">
                <Text fontWeight="bold" flex="0 0 100px">
                  {t("contacts.card_number")}
                </Text>
                <Text flex="1">{person.number}</Text>
              </HStack>
              <HStack gap="2" align="flex-start">
                <Text fontWeight="bold" flex="0 0 100px">
                  {t("contacts.card_email")}
                </Text>
                <Text flex="1">{person.email}</Text>
              </HStack>
              <HStack gap="2" align="flex-start">
                <Text fontWeight="bold" flex="0 0 100px">
                  {t("contacts.card_mobile")}
                </Text>
                <Text flex="1">{person.mobile}</Text>
              </HStack>
              <HStack gap="2" align="flex-start">
                <Text fontWeight="bold" flex="0 0 100px">
                  {t("contacts.card_address")}
                </Text>
                <Text flex="1">{person.address}</Text>
              </HStack>
              <HStack gap="2" align="flex-start">
                <Text fontWeight="bold" flex="0 0 100px">
                  {t("contacts.card_note")}
                </Text>
                <Text flex="1">{person.note}</Text>
              </HStack>
            </Flex>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default FavoritesInfos;
