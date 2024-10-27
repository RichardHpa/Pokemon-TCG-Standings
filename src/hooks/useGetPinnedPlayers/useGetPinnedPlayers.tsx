import { useCallback } from 'react';
import { useQueries, queryOptions } from '@tanstack/react-query';

import { getPokeDataTournament } from 'api/getTournament';

import { createPlayerUrl } from 'utils/createPlayerUrl';

import type {
    Division,
    Tournament,
    TournamentApiResponse,
} from 'types/tournament';
import type { Standing } from 'types/standing';
import type { UseQueryResult } from '@tanstack/react-query';

type DivisionsObject = {
    [key in Division]?: string[];
};

type PinnedPlayers = {
    [key: string]: DivisionsObject;
};

type PinnedPlayersObject = {
    [key in Division]?: Standing[];
};

export interface tournamentsQueryOptionsResult {
    tournament: Tournament;
    pinnedDivisions: PinnedPlayersObject;
}

const tournamentsQueryOptions = ({
    tournamentId,
    pinnedPlayers,
}: {
    tournamentId: string;
    pinnedPlayers: DivisionsObject;
}) => {
    return queryOptions({
        queryKey: ['tournaments', tournamentId],
        queryFn: () => getPokeDataTournament(tournamentId),
        // eslint-disable-next-line react-hooks/rules-of-hooks
        select: useCallback(
            (data: TournamentApiResponse) => {
                // get all the divisions for the tournament
                const divisionsData = data.tournament_data;

                // get the divisions that are pinned
                const pinnedDivisions = Object.keys(
                    pinnedPlayers
                ) as Division[];

                // get the standings for each of the pinned divisions
                const pinnedDivisionStandings = divisionsData.filter(
                    (division) => pinnedDivisions.includes(division.division)
                );

                // push the division into the pinnedDivisionsObject
                const pinnedDivisionsObject: PinnedPlayersObject = {};

                pinnedDivisionStandings.map((division) => {
                    // create a new empty array for the division
                    pinnedDivisionsObject[division.division] = [];
                    // get the players that are pinned for the division
                    const playersToFind = pinnedPlayers[division.division]!;
                    // find the players in the division.data that match the pinned players
                    const foundPlayers = division.data.filter((player) =>
                        // NOTE: we probably dont need to parse the name when it gets sent to localstorage, fix this later
                        playersToFind.includes(createPlayerUrl(player.name))
                    );

                    pinnedDivisionsObject[division.division] = foundPlayers;
                });

                return {
                    tournament: data.tournament,
                    pinnedDivisions: pinnedDivisionsObject,
                };
            },
            [pinnedPlayers]
        ),
    });
};

export const useGetPinnedPlayers = (pinnedPlayers: PinnedPlayers) => {
    const tournamentIds = Object.keys(pinnedPlayers);

    return useQueries({
        queries:
            tournamentIds?.map((tournamentId) =>
                tournamentsQueryOptions({
                    tournamentId,
                    pinnedPlayers: pinnedPlayers[tournamentId],
                })
            ) ?? [],
        combine: useCallback(
            (results: UseQueryResult<tournamentsQueryOptionsResult>[]) => {
                return {
                    data: results.map((result) => result.data),
                    isPending: results.some((result) => result.isPending),
                    isLoading: results.some((result) => result.isLoading),
                    isFetching: results.some((result) => result.isFetching),
                    // need to figure out what to do with errors
                    isError: results.some((result) => result.isError),
                    isSuccess: results.every((result) => result.isSuccess),
                };
            },
            []
        ),
    });
};
