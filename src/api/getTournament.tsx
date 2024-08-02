import axios from 'axios';

import type { TournamentsApiResponse } from 'types/tournament';

export const getPokeDataTournament = async (
  tournamentId: string
): Promise<TournamentsApiResponse> => {
  const url = `https://www.pokedata.ovh/apiv2/division/masters+juniors+seniors/tcg/id/${tournamentId}`;
  return axios.get(url).then(res => res.data);
};
