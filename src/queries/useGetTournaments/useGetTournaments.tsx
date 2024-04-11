import { useQuery, queryOptions } from '@tanstack/react-query';

import { getPokeDataTournaments } from 'api/getTournaments';

export const getGetTournamentsKey = () => ['tournaments'];

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
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

export const useGetTournaments = () => {
  return useQuery(tournamentsQuery());
};
