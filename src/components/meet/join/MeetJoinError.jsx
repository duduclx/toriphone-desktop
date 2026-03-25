import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import logo from "/toriLogoApp.svg";

const MeetJoinError = () => {
    // requirements
    const { t } = useTranslation();

  return (
    <Flex w="100%" h="100vh" justify="center" align="center" direction="column" gap="6" bg="bgDefault">
        <Image alt="Toriphone logo" src={logo} width="400px" />
        <Flex flexDirection="column" bg="bgElevated" gap="8" p="8" borderRadius="16px">
            <Box width="100%" textAlign="center">
                <Text fontSize="3xl" fontWeight="bold">
                    {t("meetings.join_error_title")}
                </Text>
            </Box>
            <Box>
                <Text>
                    {t("meetings.join_error_description")}
                </Text>
            </Box>
        </Flex>
    </Flex>
  )
}

export default MeetJoinError
