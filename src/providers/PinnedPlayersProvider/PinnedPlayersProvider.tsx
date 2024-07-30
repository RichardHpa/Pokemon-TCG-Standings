import { useContext, useState, createContext, useMemo, useCallback } from 'react';
import { pinnedPlayersKey } from 'constants/siteKeys';

import type { Division } from 'types/tournament';
import type { ReactNode } from 'react';

interface PinnedPlayersContextProps {
  pinnedPlayers: any;
  handlePinPlayer: (playerName: string, tournamentId: string, division: Division) => void;
  handleUnpinPlayer: (playerName: string, tournamentId: string, division: Division) => void;
  togglePinPlayer: (playerName: string, tournamentId: string, division: Division) => void;
  inPinned: (playerName: any, tournamentId: string, division: Division) => boolean;
  parsedPlayers: any;
}

const LikedContext = createContext<PinnedPlayersContextProps>({
  pinnedPlayers: {},
  handlePinPlayer: () => {},
  handleUnpinPlayer: () => {},
  togglePinPlayer: () => {},
  inPinned: () => false,
  parsedPlayers: {},
});

const getPinnedPlayers = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const pinnedPlayers = window.localStorage.getItem(pinnedPlayersKey);
    if (pinnedPlayers) {
      return pinnedPlayers;
    }
  }

  return JSON.stringify({});
};

export const PinnedPlayersProvider = ({ children }: { children: ReactNode }) => {
  const [pinnedPlayers, setPinnedPlayers] = useState<any>(() => {
    return getPinnedPlayers();
  });

  const handlePinPlayer = useCallback(
    (playerName: string, tournamentId: string, division: Division) => {
      const parsedPinnedPlayers = JSON.parse(pinnedPlayers);

      if (!parsedPinnedPlayers[tournamentId]) {
        parsedPinnedPlayers[tournamentId] = {
          [division]: [playerName],
        };
      } else if (!parsedPinnedPlayers[tournamentId][division]) {
        parsedPinnedPlayers[tournamentId][division] = [playerName];
      } else {
        parsedPinnedPlayers[tournamentId][division].push(playerName);
      }

      const stringifyPinnedPlayers = JSON.stringify(parsedPinnedPlayers);
      setPinnedPlayers(stringifyPinnedPlayers);
      localStorage.setItem(pinnedPlayersKey, stringifyPinnedPlayers);
    },
    [pinnedPlayers]
  );

  const handleUnpinPlayer = useCallback(
    (playerName: string, tournamentId: string, division: Division) => {
      const parsedPinnedPlayers = JSON.parse(pinnedPlayers);

      if (parsedPinnedPlayers[tournamentId]) {
        parsedPinnedPlayers[tournamentId][division] = parsedPinnedPlayers[tournamentId][
          division
        ].filter((p: string) => p !== playerName);
      }

      if (parsedPinnedPlayers[tournamentId][division].length === 0) {
        delete parsedPinnedPlayers[tournamentId][division];
      }
      if (Object.keys(parsedPinnedPlayers[tournamentId]).length === 0) {
        delete parsedPinnedPlayers[tournamentId];
      }

      const stringifyPinnedPlayers = JSON.stringify(parsedPinnedPlayers);
      setPinnedPlayers(stringifyPinnedPlayers);
      localStorage.setItem(pinnedPlayersKey, stringifyPinnedPlayers);
    },
    [pinnedPlayers]
  );

  const togglePinPlayer = useCallback(
    (playerName: string, tournamentId: string, division: Division) => {
      if (!inPinned(playerName, tournamentId, division)) {
        handlePinPlayer(playerName, tournamentId, division);
      } else {
        handleUnpinPlayer(playerName, tournamentId, division);
      }
    },
    [pinnedPlayers, handlePinPlayer, handleUnpinPlayer]
  );

  const inPinned = useCallback(
    (playerName: any, tournamentId: string, division: Division) => {
      const parsedPinnedPlayers = JSON.parse(pinnedPlayers);
      return parsedPinnedPlayers[tournamentId]?.[division]?.includes(playerName);
    },
    [pinnedPlayers]
  );

  const value = useMemo(() => {
    return {
      pinnedPlayers,
      handlePinPlayer,
      handleUnpinPlayer,
      togglePinPlayer,
      inPinned,
      parsedPlayers: JSON.parse(pinnedPlayers),
    };
  }, [pinnedPlayers]);

  return <LikedContext.Provider value={value}>{children}</LikedContext.Provider>;
};

export const usePinnedPlayers = () => {
  const context = useContext(LikedContext);
  return context;
};
