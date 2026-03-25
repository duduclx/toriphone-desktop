import { Flex, HStack, Text } from "@chakra-ui/react";

import Ringtone from "./Ringtone";
import RingVolume from "./RingVolume";
import RingDevice from "./RingDevice";
import RingtonePlayer from "./RingtonePlayer";

import { useWazo } from "../../../../services/WazoProvider";
import { useTranslation } from "react-i18next";

const RingPage = () => {
  const { t } = useTranslation();

  const { ringtone, ringVolume, ringDevice } = useWazo();

  return (
    <Flex flex={1} flexDirection="column" justifyContent="flex-start" gap={2} p={2} width="90%">
      <Text py="2" whiteSpace="nowrap" textAlign="center" fontSize="xl" fontWeight="bold">
        {t("preferences.ring.title")}
      </Text>
      <HStack width="100%" justifyContent="space-between">
        <Text width="30%">{t("preferences.ring.ring")} :</Text>
        <HStack width="70%">
        <Ringtone />
        <RingtonePlayer
          ringtone={ringtone}
          ringVolume={ringVolume}
          ringDevice={ringDevice}
        />
      </HStack>
      </HStack>
      <HStack width="100%" justifyContent="space-between">
        <Text width="30%">{t("preferences.ring.volume")} :</Text>
        <RingVolume />
      </HStack>
      <HStack width="100%" justifyContent="space-between">
        <Text width="30%">{t("preferences.ring.device")} :</Text>
        <RingDevice />
      </HStack>
    </Flex>
  );
};

export default RingPage;
