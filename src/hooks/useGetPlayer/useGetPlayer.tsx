import { useQuery } from '@tanstack/react-query';

import { createPlayerName } from 'utils/createPlayerName';

import { getPokedataStandings } from 'api/getPokedataStandings';

import { getTournamentStandingsKey } from 'queries/useGetTournamentStandings';

import type { useGetTournamentStandingsProps } from 'queries/useGetTournamentStandings/types';

interface useGetPlayerProps extends useGetTournamentStandingsProps {
  playerName: string;
}

export const useGetPlayerInfo = ({ tournamentId, division, playerName }: useGetPlayerProps) => {
  return useQuery({
    queryKey: getTournamentStandingsKey({ tournamentId, division }),
    queryFn: () => getPokedataStandings({ tournamentId, division }),
    staleTime: 1000 * 60 * 5, // 5 minutes,
    select: data => {
      const name = createPlayerName(playerName);
      // there can be multiple players with the same name and we have no way to differentiate them so we get them all
      const players = data.filter((player: any) => player.name === name);
      if (players.length === 0) {
        throw new Error('Player not found');
      }

      return players;
    },
  });
};
