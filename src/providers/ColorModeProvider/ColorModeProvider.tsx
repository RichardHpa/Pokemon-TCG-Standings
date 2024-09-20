import { useState, createContext, useEffect } from 'react';

import type { Dispatch, SetStateAction, ReactNode } from 'react';

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

const themes: Array<Theme> = Object.values(Theme);

type ColorModeContextType = [Theme | null, Dispatch<SetStateAction<Theme>>];

export const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

const prefersDarkMQ = '(prefers-color-scheme: dark)';
const storageKey = 'PokemonTCGStandings:currentTheme';
const getPreferredTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTheme = window.localStorage.getItem(storageKey) as Theme;
    if (storedTheme && themes.includes(storedTheme)) {
      return storedTheme;
    }
    return window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT;
  }

  return Theme.LIGHT;
};

function ColorModeProvider({ children }: { children: ReactNode }) {
  const [mode, setColorMode] = useState<Theme>(() => {
    return getPreferredTheme();
  });

  const checkTheme = (existing: Theme) => {
    const root = window.document.documentElement;
    const isDark = existing === Theme.DARK;

    root.classList.remove(isDark ? Theme.LIGHT : Theme.DARK);
    root.classList.add(existing);

    localStorage.setItem(storageKey, existing);
  };

  useEffect(() => {
    checkTheme(mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={[mode, setColorMode]}>{children}</ColorModeContext.Provider>
  );
}

export { Theme, ColorModeProvider };
