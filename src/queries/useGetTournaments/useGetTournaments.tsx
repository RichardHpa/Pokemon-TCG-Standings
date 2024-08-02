import { useQuery, queryOptions } from '@tanstack/react-query';

import { getPokeDataTournaments } from 'api/getTournaments';

export const baseTournamentKey = ['tournaments'];

export const getGetTournamentsKey = () => baseTournamentKey;

export const tournamentsQuery = () =>
  queryOptions({
    queryKey: getGetTournamentsKey(),
    queryFn: async () => {
      const tournaments = await getPokeDataTournaments();
      if (!tournaments) {
        throw new Response('', {
          status: 404,
          statusText: `No tournaments found`,
        });
      }

      return tournaments;
    },
    staleTime: 1000 * 60 * 10,
  });

export const useGetTournaments = () => {
  return useQuery(tournamentsQuery());
};
