import { Link } from 'react-router-dom';
import { useMemo, createContext, useContext, useCallback } from 'react';

import { useLocalStorage } from 'hooks/useLocalStorage';

import { useGetTournament } from 'queries/useGetTournament';
import { useGetTournamentStandings } from 'queries/useGetTournamentStandings';

import { createPlayerName } from 'utils/createPlayerName';
import { createPlayerUrl } from 'utils/createPlayerUrl';

import { Heading } from 'components/Heading';
import { Button } from 'components/Button';
import { ContentCard } from 'components/ContentCard';

import { pinnedPlayersKey } from 'constants/siteKeys';

import type { FC, ReactNode } from 'react';
import type { Division } from 'types/tournament';

interface PinnedPlayersContextProps {
  pinnedPlayers: any;
  unPinPlayer: (tournamentId: string, playerName: string, division: Division) => void;
}

const PinnedPlayersContext = createContext<PinnedPlayersContextProps>({
  pinnedPlayers: {},
  unPinPlayer: () => {},
});

export const PinnedPlayersProvider = ({ children }: { children: ReactNode }) => {
  const [pinnedPlayers, setPinnedPlayers] = useLocalStorage(pinnedPlayersKey, JSON.stringify({}));

  const unPinPlayer = useCallback(
    (tournamentId: string, playerName: string, division: Division) => {
      const parsedPinPlayers = JSON.parse(pinnedPlayers);

      const formattedPlayerName = createPlayerUrl(playerName);
      if (parsedPinPlayers[tournamentId][division].includes(formattedPlayerName)) {
        parsedPinPlayers[tournamentId][division] = parsedPinPlayers[tournamentId][division].filter(
          (p: string) => p !== formattedPlayerName
        );
      }

      if (parsedPinPlayers[tournamentId][division].length === 0) {
        delete parsedPinPlayers[tournamentId][division];
      }

      if (Object.keys(parsedPinPlayers[tournamentId]).length === 0) {
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
  player: any;
  division: Division;
}

const PinedPlayerInfo: FC<PinedPlayerInfoProps> = ({ tournamentId, division, player }) => {
  const { unPinPlayer } = usePinnedPlayers();

  const playerName = useMemo(() => {
    return createPlayerName(player.name);
  }, [player]);

  const handleUnpinPlayer = useCallback(() => {
    unPinPlayer(tournamentId, playerName, division);
  }, [division, playerName, tournamentId, unPinPlayer]);

  return (
    <li className="py-3 sm:py-4 w-full items-center pl-3 pr-6  text-gray-700 cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400">
      <Link to={`/tournaments/${tournamentId}/${division}/${playerName}`}>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Heading level="4" className="mb-0">
              {player.placing}
            </Heading>
            <div className="flex flex-col">
              {player.name} - {division}
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

const DivisionPlayers = ({
  tournamentId,
  division,
  players,
}: {
  tournamentId: string;
  division: Division;
  players: any;
}) => {
  const { data: standingsData } = useGetTournamentStandings({
    tournamentId,
    division,
  });

  const foundPlayers = useMemo(() => {
    if (!standingsData) return [];
    const formattedPlayers = players.map((player: string) => createPlayerName(player));
    return standingsData.filter((standing: any) => {
      return formattedPlayers.includes(standing.name);
    });
  }, [players, standingsData]);

  return (
    <>
      {foundPlayers.map((player: any) => {
        return (
          <PinedPlayerInfo
            tournamentId={tournamentId}
            division={division}
            player={player}
            key={player.name}
          />
        );
      })}
    </>
  );
};
interface PinnedPlayersContentProps {
  tournamentId: string;
  players: any;
}

const PinnedPlayersContent: FC<PinnedPlayersContentProps> = ({ tournamentId, players }) => {
  const { data: tournamentData } = useGetTournament(tournamentId);

  if (!tournamentData) {
    return null;
  }

  const divisions = Object.keys(players) as Division[];

  return (
    <ContentCard title={`Pinned players for ${tournamentData.name}`}>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {divisions.map((division: Division) => {
          return (
            <DivisionPlayers
              key={division}
              tournamentId={tournamentId}
              division={division}
              players={players[division]}
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
