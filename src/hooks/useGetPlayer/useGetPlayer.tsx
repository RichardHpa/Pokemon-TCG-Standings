// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck - we need to fix the types here
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { createPlayerName } from 'utils/createPlayerName';

import { getPokeDataTournament } from 'api/getTournament';

import { getTournamentStandingsKey } from 'queries/useGetTournamentStandings';

import type { useGetTournamentStandingsProps } from 'queries/useGetTournamentStandings/types';

interface useGetPlayerProps extends useGetTournamentStandingsProps {
    playerName: string;
}

export const useGetPlayerInfo = ({
    tournamentId,
    division,
    playerName,
}: useGetPlayerProps) => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: getTournamentStandingsKey({ tournamentId, division }),
        queryFn: async () => {
            const tournament = await getPokeDataTournament(tournamentId);
            const divisions = tournament.tournament_data;
            divisions.map((division) => {
                const data = division.data;
                const divisionKey = getTournamentStandingsKey({
                    tournamentId,
                    division: division.division,
                });
                return queryClient.setQueryData(divisionKey, data);
            });

            const divisionToReturn = divisions.find(
                (division) => division.division === division
            )!;
            return divisionToReturn.data;
        },
        select: (data) => {
            const name = createPlayerName(playerName);
            // there can be multiple players with the same name and we have no way to differentiate them so we get them all
            const players = data.filter((player) => player.name === name);
            if (players.length === 0) {
                throw new Error('Player not found');
            }

            return { players, standings: data };
        },
    });
};
