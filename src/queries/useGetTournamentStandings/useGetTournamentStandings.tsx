import { getGetTournamentKey } from 'queries/useGetTournament';

import type { useGetTournamentStandingsProps } from './types';

export const getTournamentStandingsKey = ({
  tournamentId,
  division,
}: useGetTournamentStandingsProps) => [...getGetTournamentKey(tournamentId), 'standings', division];
