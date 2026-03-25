import { Flex, Text, Separator } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import HeaderSearch from '../../header/search/HeaderSearch';
import { useWazo } from '../../../services/WazoProvider';
import SwitchboardAnswered from './SwitchboardAnswered';

const SwitchboardContent = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { callSession, callSessions } = useWazo();

  return (
    <Flex flexDirection="column" height="100vh" flex="1" p="2" overflow="hidden" >
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl" truncate>
          {t('switchboard.page_title')}
        </Text>
        <HeaderSearch />
      </Flex>
        <Separator />
        {callSession.answered && <SwitchboardAnswered />}
    </Flex>
  )
}

export default SwitchboardContent