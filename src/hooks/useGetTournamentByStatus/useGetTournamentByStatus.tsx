import { useQuery } from '@tanstack/react-query';
import { getPokeDataTournaments } from 'api/getTournaments';

import { getGetTournamentsKey } from 'queries/useGetTournaments';

import { FINISHED, RUNNING, NOT_STARTED, CHECK_IN } from 'constants/tournament';

export const useGetTournamentByStatus = () => {
    return useQuery({
        queryKey: getGetTournamentsKey(),
        queryFn: getPokeDataTournaments,
        select: (data) => {
            const runningTournaments = data?.filter(
                (tournament) => tournament.tournamentStatus === RUNNING
            );
            const finishedTournaments = data?.filter(
                (tournament) => tournament.tournamentStatus === FINISHED
            );

            const upComingTournaments = data?.filter(
                (tournament) =>
                    tournament.tournamentStatus === NOT_STARTED ||
                    tournament.tournamentStatus === CHECK_IN
            );

            return {
                runningTournaments,
                finishedTournaments,
                upComingTournaments,
            };
        },
    });
};
