import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getPokeDataTournament } from 'api/getTournament';

import { getGetTournamentKey } from 'queries/useGetTournament';
import { getTournamentStandingsKey } from 'queries/useGetTournamentStandings';

import type { UseGetPlayersByCountry } from './types';

export const divisionOrder = ['Masters', 'Seniors', 'Juniors'];

export const useGetPlayersByCountry = ({ tournamentId, country }: UseGetPlayersByCountry) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [getGetTournamentKey(tournamentId), { country }],
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
      return tournament;
    },
    select: data => {
      const divisions = data.tournament_data;

      divisions.forEach(division => {
        division.data = division.data.filter(player => player.name.includes(`[${country}]`));
      });

      const orderedData = divisions.sort(
        (a, b) => divisionOrder.indexOf(a.division) - divisionOrder.indexOf(b.division)
      );

      // remove if array is 0
      orderedData.forEach(division => {
        if (division.data.length === 0) {
          const index = orderedData.indexOf(division);
          orderedData.splice(index, 1);
        }
      });

      return {
        tournament: data.tournament,
        divisions: orderedData,
      };
    },
  });
};
