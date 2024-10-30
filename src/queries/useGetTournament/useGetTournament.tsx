import { useQuery, queryOptions } from '@tanstack/react-query';

import { getPokeDataTournament } from 'api/getTournament';

import { baseTournamentKey } from 'queries/useGetTournaments';

import type { TournamentApiResponse } from 'types/tournament';
export interface useGetTournamentProps<TData> {
    tournamentId: string | number;
    select?: (data: TournamentApiResponse) => TData;
}

export const getGetTournamentKey = (tournamentId: string) => [
    ...baseTournamentKey,
    tournamentId,
];

export function getTournamentQueryOptions<TData = TournamentApiResponse>(
    tournamentId: string | number,
    select?: useGetTournamentProps<TData>['select']
) {
    const parsedTournamentId = tournamentId.toString();
    return queryOptions({
        queryKey: getGetTournamentKey(parsedTournamentId),
        queryFn: () => getPokeDataTournament(parsedTournamentId),
        select: select,
    });
}

export function useGetTournament<TData = TournamentApiResponse>({
    tournamentId,
    select,
}: useGetTournamentProps<TData>) {
    return useQuery(getTournamentQueryOptions<TData>(tournamentId, select));
}
