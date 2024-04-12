import { RUNNING } from 'constants/tournament';

import type { Tournament } from 'types/tournament';

export const useGetRunningTournaments = (data?: Tournament[]) => {
  if (!data) return [];
  const runningTournaments = data.filter(tournament => tournament.tournamentStatus === RUNNING);
  return runningTournaments;
};
