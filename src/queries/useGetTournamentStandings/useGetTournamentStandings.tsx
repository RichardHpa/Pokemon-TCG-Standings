import { useQuery, queryOptions } from '@tanstack/react-query';

import { getPokedataStandings } from 'api/getPokedataStandings';

import { getGetTournamentKey } from 'queries/useGetTournament';

import type { useGetTournamentStandingsProps } from './types';

export const getTournamentStandingsKey = ({
  tournamentId,
  division,
}: useGetTournamentStandingsProps) => [...getGetTournamentKey(tournamentId), 'standings', division];

export const tournamentStandingsQuery = ({
  tournamentId,
  division,
}: useGetTournamentStandingsProps) =>
  queryOptions({
    queryKey: getTournamentStandingsKey({ tournamentId, division }),
    queryFn: () => getPokedataStandings({ tournamentId, division }),
  });

export const useGetTournamentStandings = ({
  tournamentId,
  division,
}: useGetTournamentStandingsProps) => {
  return useQuery(tournamentStandingsQuery({ tournamentId, division }));
};
