import { useQuery, queryOptions } from '@tanstack/react-query';

import { getPokedataStandings } from 'api/getPokedataStandings';

export const getTournamentStandingsKey = (tournamentId: string) => [
  'tournamentId',
  tournamentId,
  'standings',
];

export const tournamentStandingsQuery = (tournamentId: string) =>
  queryOptions({
    queryKey: getTournamentStandingsKey(tournamentId),
    queryFn: async () => {
      const standings = await getPokedataStandings(tournamentId);
      if (!standings) {
        throw new Response('', {
          status: 404,
          statusText: `No standings found for tournament ${tournamentId}`,
        });
      }
      return standings;
    },
  });

export const useGetTournamentStandings = (tournamentId: string) => {
  return useQuery(tournamentStandingsQuery(tournamentId));
};
