import { useGetTournaments } from 'queries/useGetTournaments/useGetTournaments';

import { FINISHED, RUNNING, NOT_STARTED } from 'constants/tournament';

export const useGetTournamentByStatus = () => {
  const { data: tournaments, ...rest } = useGetTournaments();

  const runningTournaments = tournaments?.filter(
    tournament => tournament.tournamentStatus === RUNNING
  );
  const finishedTournaments = tournaments?.filter(
    tournament => tournament.tournamentStatus === FINISHED
  );
  const upComingTournaments = tournaments?.filter(
    tournament => tournament.tournamentStatus === NOT_STARTED
  );

  return {
    runningTournaments,
    finishedTournaments,
    upComingTournaments,
    ...rest,
  };
};
