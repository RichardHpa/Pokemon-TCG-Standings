import { useQuery } from '@tanstack/react-query';
import { getPokeDataTournaments } from 'api/getTournaments';

import { useGetTournaments, getGetTournamentsKey } from 'queries/useGetTournaments';

import { FINISHED, RUNNING, NOT_STARTED } from 'constants/tournament';

export const useGetTournamentByStatus = () => {
  return useQuery({
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
    select: data => {
      const runningTournaments = data?.filter(
        tournament => tournament.tournamentStatus === RUNNING
      );
      const finishedTournaments = data?.filter(
        tournament => tournament.tournamentStatus === FINISHED
      );
      const upComingTournaments = data?.filter(
        tournament => tournament.tournamentStatus === NOT_STARTED
      );

      return {
        runningTournaments,
        finishedTournaments,
        upComingTournaments,
      };
    },
  });
  // const { data: tournaments, ...rest } = useGetTournaments();

  // const runningTournaments = tournaments?.filter(
  //   tournament => tournament.tournamentStatus === RUNNING
  // );
  // const finishedTournaments = tournaments?.filter(
  //   tournament => tournament.tournamentStatus === FINISHED
  // );
  // const upComingTournaments = tournaments?.filter(
  //   tournament => tournament.tournamentStatus === NOT_STARTED
  // );

  // return {
  //   runningTournaments,
  //   finishedTournaments,
  //   upComingTournaments,
  //   ...rest,
  // };
};
