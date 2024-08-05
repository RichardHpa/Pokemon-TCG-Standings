import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getPokeDataTournament } from 'api/getTournament';

import { getGetTournamentKey } from 'queries/useGetTournament';
import { getTournamentStandingsKey } from 'queries/useGetTournamentStandings';

import type { UseGetPlayersByCountry } from './types';

const order = ['Masters', 'Seniors', 'Juniors'];

export const useGetPlayersByCountry = ({ tournamentId, country }: UseGetPlayersByCountry) => {
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
    staleTime: 60 * 10 * 1000,
    select: data => {
      const divisions = data.tournament_data;

      divisions.forEach((division: any) => {
        division.data = division.data.filter((player: any) => player.name.includes(`[${country}]`));
      });

      const orderedData = divisions.sort(
        (a: any, b: any) => order.indexOf(a.division) - order.indexOf(b.division)
      );
      return {
        tournament: data.tournament,
        divisions: orderedData,
      };
    },
  });
};
