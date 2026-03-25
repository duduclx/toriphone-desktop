import { useState } from "react";
import { Box, Button, Field, Flex, HStack, Separator, Text } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";
import { CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useAuth } from "toriphone-auth";
import { useWazo } from "../../../services/WazoProvider";

import HeaderSearch from "../../header/search/HeaderSearch";

const UserForwards = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { user, setUser } = useAuth();
  const { forwardsUpdate } = useWazo();

  // states
  const [checkedItems, setCheckedItems] = useState([
    user.profile.forwards[0].enabled,
    user.profile.forwards[1].enabled,
    user.profile.forwards[2].enabled,
  ]);
  const [destinations, setDestinations] = useState([
    user.profile.forwards[0].destination,
    user.profile.forwards[1].destination,
    user.profile.forwards[2].destination,
  ]);

  const onSave = async () => {
    const promise = await forwardsUpdate(destinations, checkedItems);
    if (promise.status == "success") {
      // Mettez à jour le profil utilisateur localement
      setUser((prevUser) => ({
        ...prevUser,
        profile: {
          ...prevUser.profile,
          forwards: prevUser.profile.forwards.map((forward, index) => ({
            ...forward,
            destination: destinations[index],
            enabled: checkedItems[index],
          })),
        },
      }));
    }
    toaster.create(promise);
  };

  return (
    <Flex flex="1" flexDirection="column" p="2" height="100vh" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t("forwards.title")}
        </Text>
        <HeaderSearch />
      </Flex>
      <Separator />
      <Flex
        flex="1"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        overflowY="auto"
        className="hide-scrollbar"
      >
        <Field.Root width="50%">
          <Field.Label htmlFor="busy">{t("forwards.busy")} :</Field.Label>
          <HStack width="full">
            <InputUi
            id="busy"
            
              value={destinations[2]}
              onChange={(e) => setDestinations([destinations[0], destinations[1], e.target.value])}
            />
            <CheckboxUi
            size="lg"
              checked={checkedItems[2]}
              onCheckedChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], e.checked])}
            >{t("forwards.active")}</CheckboxUi>
          </HStack>
        </Field.Root>
        <Field.Root mt="4" width="50%">
          <Field.Label htmlFor="noanswer">{t("forwards.noanswer")} :</Field.Label>
          <HStack width="full">
            <InputUi
            id="noanswer"
              value={destinations[1]}
              onChange={(e) => setDestinations([destinations[0], e.target.value, destinations[2]])}
            />
            <CheckboxUi
              size="lg"
              checked={checkedItems[1]}
              onCheckedChange={(e) => setCheckedItems([checkedItems[0], e.checked, checkedItems[2]])}
            >{t("forwards.active")}</CheckboxUi>
          </HStack>
        </Field.Root>
        <Field.Root mt="4" width="50%">
          <Field.Label htmlFor="unconditional">{t("forwards.unconditional")} :</Field.Label>
          <HStack width="full">
            <InputUi
            id="unconditional"
              value={destinations[0]}
              onChange={(e) => setDestinations([e.target.value, destinations[1], destinations[2]])}
            />
            <CheckboxUi
              size="lg"
              checked={checkedItems[0]}
              onCheckedChange={(e) => setCheckedItems([e.checked, checkedItems[1], checkedItems[2]])}
            >{t("forwards.active")}</CheckboxUi>
          </HStack>
        </Field.Root>
        <Box mt="4">
          <Button colorPalette="primary" mr="3" onClick={() => onSave()}>
            {t("forwards.save")}
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default UserForwards;
