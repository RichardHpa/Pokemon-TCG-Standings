import { useCallback } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

import { IconButton } from 'components/Button/IconButton';

import { useColorMode, Theme } from 'providers/ColorModeProvider';

export const ColorModeSwitcher = () => {
  const [mode, setColorMode] = useColorMode();

  const handleToggleTheme = useCallback(() => {
    setColorMode(prev => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  }, [setColorMode]);

  return (
    <IconButton
      onClick={handleToggleTheme}
      icon={mode === Theme.DARK ? <MoonIcon /> : <SunIcon />}
      alt={mode === Theme.DARK ? 'Switch to light mode' : 'Switch to dark mode'}
    ></IconButton>
  );
};
