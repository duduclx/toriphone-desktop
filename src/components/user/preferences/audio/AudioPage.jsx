import { Flex, HStack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useWazo } from "../../../../services/WazoProvider";

import AudioDevice from "./AudioDevice";
import AudioVolume from "./AudioVolume";
import AudioPlayer from "./AudioPlayer";

const AudioPage = () => {
  const { t } = useTranslation();
  
  const { audioDevice, audioVolume } = useWazo();

  return (
    <Flex flex={1} flexDirection="column" justifyContent="flex-start" gap={2} p={2} width="90%">
      <Text py="2" whiteSpace="nowrap" textAlign="center" fontSize="xl" fontWeight="bold">
        {t("preferences.audio.title")}
      </Text>
      <HStack justifyContent="space-between" flex={1}>
        <Text width="30%">{t("preferences.audio.volume")} :</Text>
        <AudioVolume />
      </HStack>
      <HStack justifyContent="space-between" width="100%">
        <Text width="30%">{t("preferences.audio.device")} :</Text>
        <HStack width="70%">
          <AudioDevice />
          <AudioPlayer audioDevice={audioDevice} audioVolume={audioVolume} />
        </HStack>
      </HStack>
    </Flex>
  );
};

export default AudioPage;
