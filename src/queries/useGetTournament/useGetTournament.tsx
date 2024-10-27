import { useQuery } from '@tanstack/react-query';

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

export function useGetTournament<TData = TournamentApiResponse>({
    tournamentId,
    select,
}: useGetTournamentProps<TData>) {
    const parsedTournamentId = tournamentId.toString();
    return useQuery({
        queryKey: getGetTournamentKey(parsedTournamentId),
        queryFn: () => getPokeDataTournament(parsedTournamentId),
        select: select,
    });
}
