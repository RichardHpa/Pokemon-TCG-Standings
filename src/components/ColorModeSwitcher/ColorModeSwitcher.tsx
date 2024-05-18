import { useCallback } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

import { useColorMode, Theme } from 'providers/ColorModeProvider';

export const ColorModeSwitcher = () => {
  const [mode, setColorMode] = useColorMode();

  const handleToggleTheme = useCallback(() => {
    setColorMode(prev => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  }, [setColorMode]);

  // This will be an IconButton
  return (
    <button
      type="button"
      className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white  dark:hover:bg-blue-500"
      onClick={handleToggleTheme}
    >
      {mode === Theme.DARK ? (
        <MoonIcon className="h-3 w-3 inline-block" />
      ) : (
        <SunIcon className="h-3 w-3 inline-block" />
      )}
      <span className="sr-only">
        {mode === Theme.DARK ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
};
