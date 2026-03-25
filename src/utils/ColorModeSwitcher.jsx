import { IconButton } from '@chakra-ui/react';
import { useColorModeValue, useColorMode } from '../components/ui/color-mode';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      onClick={toggleColorMode}
      {...props}
    ><SwitchIcon /></IconButton>
  );
};
