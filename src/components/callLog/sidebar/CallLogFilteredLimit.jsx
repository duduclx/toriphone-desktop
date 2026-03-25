import { Flex, Box, Text } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

const CallLogFilteredLimit = ({action, value}) => {
  // requirements
  const {t} = useTranslation();
  
  return (
    <Flex
      flexDirection="row"
      flex="1"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Text>{t('callLog.filter_result_number')}</Text>
      </Box>
      <Box width="60px">
        <InputUi
          placeholder="5"
          value={value}
          onChange={(e) => action(e)}
        />
      </Box>
    </Flex>
  );
};

export default CallLogFilteredLimit;
