import { Flex, HStack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import CameraDevice from "./CameraDevice";

const CameraPage = () => {
    const { t } = useTranslation();
    
    return (
      <Flex flex={1} flexDirection="column" justifyContent="flex-start" gap={2} p={2} width="90%">
        <Text py="2" whiteSpace="nowrap" textAlign="center" fontSize="xl" fontWeight="bold">
          {t("preferences.video.title")}
        </Text>
        <HStack justifyContent="space-between" width="100%">
          <Text width="30%">{t("preferences.video.device")} :</Text>
          <CameraDevice />
        </HStack>
      </Flex>
    );
}

export default CameraPage