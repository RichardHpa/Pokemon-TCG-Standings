import { Link } from 'react-router-dom';
import { useMemo, createContext, useContext, useCallback } from 'react';
import { Heading } from 'components/Heading';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { Button } from 'components/Button';

import { useGetTournament } from 'queries/useGetTournament';
import { useGetTournamentStandings } from 'queries/useGetTournamentStandings';

import { getPlayerInfo } from 'utils/getPlayerInfo';
import { createPlayerName } from 'utils/createPlayerName';

import { ContentCard } from 'components/ContentCard';

import { pinnedPlayersKey } from 'constants/siteKeys';

import type { FC, ReactNode } from 'react';
import type { Standing } from 'types/standing';

interface PinnedPlayersContextProps {
  pinnedPlayers: any;
  unPinPlayer: (tournamentId: string, playerName: string) => void;
}

const PinnedPlayersContext = createContext<PinnedPlayersContextProps>({
  pinnedPlayers: {},
  unPinPlayer: () => {},
});

export const PinnedPlayersProvider = ({ children }: { children: ReactNode }) => {
  const [pinnedPlayers, setPinnedPlayers] = useLocalStorage(pinnedPlayersKey, JSON.stringify({}));

  const unPinPlayer = useCallback(
    (tournamentId: string, playerName: string) => {
      const parsedPinPlayers = JSON.parse(pinnedPlayers);
      if (parsedPinPlayers[tournamentId].includes(playerName)) {
        parsedPinPlayers[tournamentId] = parsedPinPlayers[tournamentId].filter(
          (p: string) => p !== playerName
        );
      }

      // remove the tournament if there are no more players
      if (parsedPinPlayers[tournamentId].length === 0) {
        delete parsedPinPlayers[tournamentId];
      }

      setPinnedPlayers(JSON.stringify(parsedPinPlayers));
    },
    [pinnedPlayers, setPinnedPlayers]
  );

  const value = useMemo(() => {
    return { pinnedPlayers: JSON.parse(pinnedPlayers), unPinPlayer };
  }, [pinnedPlayers, unPinPlayer]);

  return <PinnedPlayersContext.Provider value={value}>{children}</PinnedPlayersContext.Provider>;
};

const usePinnedPlayers = () => useContext(PinnedPlayersContext);

interface PinedPlayerInfoProps {
  tournamentId: string;
  playerName: string;
  standings: Standing[];
}

const PinedPlayerInfo: FC<PinedPlayerInfoProps> = ({ tournamentId, playerName, standings }) => {
  const { unPinPlayer } = usePinnedPlayers();
  const player = useMemo(() => {
    if (!standings) return undefined;
    const res = getPlayerInfo(standings, createPlayerName(playerName));
    if (!res) throw new Error('Player not found');
    return { ...res.player };
  }, [standings, playerName]);

  const handleUnpinPlayer = useCallback(() => {
    unPinPlayer(tournamentId, playerName);
  }, [playerName, tournamentId, unPinPlayer]);

  if (!player) {
    return null;
  }

  return (
    <li className="py-3 sm:py-4 w-full items-center pl-3 pr-6  text-gray-700 cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400">
      <Link to={`/tournaments/${tournamentId}/${playerName}`}>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Heading level="4" className="mb-0">
              {player.placing}
            </Heading>
            <div className="flex flex-col">
              {player.name}
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                {player.record.wins}-{player.record.losses}-{player.record.ties}
              </p>
            </div>
          </div>

          <Button
            variant="outlined"
            color="secondary"
            size="sm"
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
              handleUnpinPlayer();
            }}
          >
            Unpin
          </Button>
        </div>
      </Link>
    </li>
  );
};

interface PinnedPlayersContentProps {
  tournamentId: string;
  players: any[];
}

const PinnedPlayersContent: FC<PinnedPlayersContentProps> = ({ tournamentId, players }) => {
  const { data: tournamentData, isLoading: isLoadingTournament } = useGetTournament(tournamentId);
  const { data: standingsData, isLoading: isLoadingStandings } =
    useGetTournamentStandings(tournamentId);

  if (isLoadingTournament || isLoadingStandings) {
    return <div>Loading...</div>;
  }

  if (!tournamentData || !standingsData) {
    return null;
  }

  return (
    <ContentCard title={tournamentData.name}>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {players.map((player: string) => {
          return (
            <PinedPlayerInfo
              key={player}
              tournamentId={tournamentId}
              playerName={player}
              standings={standingsData}
            />
          );
        })}
      </ul>
    </ContentCard>
  );
};

export const RawPinnedPlayers = () => {
  const { pinnedPlayers } = usePinnedPlayers();

  if (Object.keys(pinnedPlayers).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <Heading level="4">Pinned players</Heading>

      {Object.keys(pinnedPlayers).map(key => {
        return <PinnedPlayersContent key={key} tournamentId={key} players={pinnedPlayers[key]} />;
      })}
    </div>
  );
};

export const PinnedPlayers = () => {
  return (
    <PinnedPlayersProvider>
      <RawPinnedPlayers />
    </PinnedPlayersProvider>
  );
};
