/* eslint-disable react-hooks/rules-of-hooks */
import { useQueries, queryOptions, useQueryClient } from '@tanstack/react-query';

import { getPokeDataTournament } from 'api/getTournament';

import { getGetTournamentKey } from 'queries/useGetTournament';
import { getTournamentStandingsKey } from 'queries/useGetTournamentStandings';

import { createPlayerName } from 'utils/createPlayerName';

import type { Division, TournamentStatus } from 'types/tournament';
import type { Standing } from 'types/standing';

const tournamentsQueryOptions = (tournamentId: string) => {
  const queryClient = useQueryClient();
  return queryOptions({
    queryKey: ['tournaments', tournamentId, 'pinned'],
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

      queryClient.setQueryData(getGetTournamentKey(tournamentId), tournament);
      return tournament;
    },
  });
};

type PlayersObject = {
  [key in Division]?: Standing[];
};

export interface PinnedTournamentObject {
  tournamentId: string;
  tournamentName: string;
  tournamentStatus: TournamentStatus;
  players: PlayersObject;
}

type PinnedPlayers = {
  [key: string]: PlayersObject;
};

export const useGetPinnedPlayers = (pinnedPlayers: PinnedPlayers) => {
  const tournamentIds = Object.keys(pinnedPlayers);
  return useQueries({
    queries: tournamentIds?.map(tournamentId => tournamentsQueryOptions(tournamentId)) ?? [],
    combine: tournaments => {
      const filteredPlayers = tournaments.map(res => {
        if (!res.data) return res;
        const tournamentId = res.data.tournament.id;
        const tournamentName = res.data.tournament.name;
        const tournamentStatus = res.data.tournament.tournamentStatus;

        const tournamentObject: PinnedTournamentObject = {
          tournamentId,
          tournamentName,
          tournamentStatus,
          players: {},
        };

        const pinnedInfo = pinnedPlayers[tournamentId];
        const pinnedDivisions = Object.keys(pinnedInfo) as Division[];
        console.log('pinnedDivisions', pinnedDivisions);
        pinnedDivisions.forEach(division => {
          const divisionData = res.data.tournament_data.find(info => info.division === division);
          if (!divisionData) return;
          if (!tournamentObject.players[division]) {
            tournamentObject.players[division] = [];
          }
          const pinnedPlayersInDivision = pinnedInfo[division];
          if (!pinnedPlayersInDivision) return;
          console.log('pinnedPlayersInDivision', pinnedPlayersInDivision);
          pinnedPlayersInDivision.forEach(playerName => {
            const foundPlayer = divisionData.data.find(
              (player: Standing) => createPlayerName(player) === playerName
            );
            if (foundPlayer) {
              tournamentObject.players[division].push(foundPlayer);
            }
          });
          // tournamentObject.players[division] = pinnedPlayers[tournamentId][division].map(
          //   (player: Standing) => {
          //     const name = createPlayerName(player);
          //     const foundPlayer = divisionData.data.find(
          //       (player: Standing) => player.name === name
          //     );
          //     return foundPlayer;
          //   }
          // );
        });
        console.log(tournamentObject);
        return tournamentObject;
      }) as PinnedTournamentObject[];

      return {
        filteredPlayers,
        isLoading: tournaments.some(result => result.isLoading),
      };
    },
  });
};
