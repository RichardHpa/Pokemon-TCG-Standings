import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getPokeDataTournament } from 'api/getTournament';

import { getTournamentStandingsKey } from 'queries/useGetTournamentStandings';

import type { useGetTournamentStandingsProps } from 'queries/useGetTournamentStandings/types';

export const useGetDivision = ({ tournamentId, division }: useGetTournamentStandingsProps) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: getTournamentStandingsKey({ tournamentId, division }),
    queryFn: async () => {
      const tournament = await getPokeDataTournament(tournamentId);
      const divisions = tournament.tournament_data;
      divisions.map(division => {
        const data = division.data;
        const divisionKey = getTournamentStandingsKey({
          tournamentId,
          division: division.division,
        });
        return queryClient.setQueryData(divisionKey, data);
      });

      const divisionToReturn = divisions.find(
        returnedDivision => returnedDivision.division === division
      )!;
      return divisionToReturn.data;
    },
  });
};
