/* eslint-disable react-hooks/rules-of-hooks */
import {
    useQueries,
    queryOptions,
    useQueryClient,
} from '@tanstack/react-query';

// {"0000127":{"masters":["Tord_Reklev_[NO]","Andrew_Hedrick_[US]"]},"0000109":{"masters":["Kenny_Potter_[NZ]"]}}

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
            divisions.map((division) => {
                const data = division.data;
                const divisionKey = getTournamentStandingsKey({
                    tournamentId,
                    division: division.division,
                });
                return queryClient.setQueryData(divisionKey, data);
            });

            queryClient.setQueryData(
                getGetTournamentKey(tournamentId),
                tournament
            );
            return tournament;
        },
    });
};

type DivisionsObject = {
    [key in Division]?: string[];
};

export interface PinnedTournamentObject {
    tournamentId: string;
    tournamentName: string;
    tournamentStatus: TournamentStatus;
    players: {
        [key in Division]?: Standing[];
    };
}

type PinnedPlayers = {
    [key: string]: DivisionsObject;
};

export const useGetPinnedPlayers = (pinnedPlayers: PinnedPlayers) => {
    const tournamentIds = Object.keys(pinnedPlayers);
    return useQueries({
        queries:
            tournamentIds?.map((tournamentId) =>
                tournamentsQueryOptions(tournamentId)
            ) ?? [],
        combine: (tournaments) => {
            const filteredPlayers = tournaments.map((tournament) => {
                if (tournament.isLoading || !tournament.data) return;
                const tournamentData = tournament.data.tournament_data;

                const tournamentId = tournament.data.tournament.id;
                const tournamentName = tournament.data.tournament.name;
                const tournamentStatus =
                    tournament.data.tournament.tournamentStatus;

                const tournamentObject: PinnedTournamentObject = {
                    tournamentId,
                    tournamentName,
                    tournamentStatus,
                    players: {},
                };
                const pinnedInfo = pinnedPlayers[tournamentId];
                const pinnedDivisions = Object.keys(pinnedInfo) as Division[];
                pinnedDivisions.forEach((division) => {
                    const fullPinnedDivisionInfo: Standing[] = [];
                    const divisionData = tournamentData.find(
                        (info) => info.division === division
                    )!.data;

                    const pinnedPlayersInDivision = pinnedInfo[division]!;
                    pinnedPlayersInDivision.forEach((playerName) => {
                        const foundPlayerInfo = divisionData.find(
                            (divisionPlayer) =>
                                createPlayerName(playerName) ===
                                divisionPlayer.name
                        );
                        if (!foundPlayerInfo) return;
                        fullPinnedDivisionInfo.push(foundPlayerInfo);
                    });
                    const sortedPinnedDivisionInfo =
                        fullPinnedDivisionInfo.sort(
                            (a, b) => a.placing - b.placing
                        );

                    tournamentObject.players[division] =
                        sortedPinnedDivisionInfo;
                });
                return tournamentObject;
            }) as PinnedTournamentObject[];

            return {
                filteredPlayers,
                isLoading: tournaments.some((result) => result.isLoading),
                isFetching: tournaments.some((result) => result.isFetching),
            };
        },
    });
};
