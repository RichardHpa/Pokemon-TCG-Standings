import { useState, useEffect } from 'react';

const prefix = `PokemonTCGStandings:`;

export function useLocalStorage(key: string, defaultValue: any) {
  const prefixedKey = `${prefix}${key}`;
  const [state, setState] = useState(
    () => window.localStorage.getItem(prefixedKey) || defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(prefixedKey, state);
  }, [state, prefixedKey]);

  return [state, setState];
}
