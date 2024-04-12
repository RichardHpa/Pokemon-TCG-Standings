import { RUNNING } from 'constants/tournament';

import type { Tournament } from 'types/tournament';

export const useGetLatestTournaments = (data?: Tournament[], amount = 10) => {
  if (!data) return [];
  const latestTournaments = data.filter(tournament => tournament.tournamentStatus !== RUNNING);
  // then get the latest ones

  if (amount === -1) {
    return latestTournaments;
  }

  return latestTournaments.slice(0, amount);
};
