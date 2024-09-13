import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getPokeDataTournament } from 'api/getTournament';

import { baseTournamentKey } from 'queries/useGetTournaments';
import { getTournamentStandingsKey } from 'queries/useGetTournamentStandings';

export const getGetTournamentKey = (tournamentId: string) => [...baseTournamentKey, tournamentId];

export const useGetTournament = (tournamentId: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: getGetTournamentKey(tournamentId),
    queryFn: async () => {
      const tournament = await getPokeDataTournament(tournamentId);
      const divisions = tournament.tournament_data;
      divisions.map((division: any) => {
        const data = division.data;
        const divisionKey = getTournamentStandingsKey({
          tournamentId,
          division: division.division,
        });
        return queryClient.setQueryData(divisionKey, data);
      });
      return tournament;
    },
    select: data => {
      return data.tournament;
    },
  });
};
