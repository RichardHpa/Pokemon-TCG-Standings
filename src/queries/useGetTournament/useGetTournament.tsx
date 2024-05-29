import { useQuery, queryOptions } from '@tanstack/react-query';

import { getPokeDataTournament } from 'api/getTournament';

export const getGetTournamentsKey = (tournamentId: string) => ['tournament', tournamentId];

export const tournamentQuery = (tournamentId: string) =>
  queryOptions({
    queryKey: getGetTournamentsKey(tournamentId),
    queryFn: async () => {
      const tournament = await getPokeDataTournament(tournamentId);
      if (!tournament) {
        throw new Response('', {
          status: 404,
          statusText: `No tournament found for ${tournamentId}`,
        });
      }
      return tournament;
    },
  });

export const useGetTournament = (tournamentId: string) => {
  return useQuery(tournamentQuery(tournamentId));
};
