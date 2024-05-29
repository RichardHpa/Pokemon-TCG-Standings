import { useQuery, queryOptions } from '@tanstack/react-query';

import { getPokedataStandings } from 'api/getPokedataStandings';

import type { useGetTournamentStandingsProps } from './types';

export const getTournamentStandingsKey = ({
  tournamentId,
  division,
}: useGetTournamentStandingsProps) => ['tournament', tournamentId, 'standings', division];

export const tournamentStandingsQuery = ({
  tournamentId,
  division,
}: useGetTournamentStandingsProps) =>
  queryOptions({
    queryKey: getTournamentStandingsKey({ tournamentId, division }),
    queryFn: async () => {
      const standings = await getPokedataStandings({ tournamentId, division });
      if (!standings) {
        throw new Response('', {
          status: 404,
          statusText: `No standings found for tournament ${tournamentId}`,
        });
      }
      return standings;
    },
  });

export const useGetTournamentStandings = ({
  tournamentId,
  division,
}: useGetTournamentStandingsProps) => {
  return useQuery(tournamentStandingsQuery({ tournamentId, division }));
};
