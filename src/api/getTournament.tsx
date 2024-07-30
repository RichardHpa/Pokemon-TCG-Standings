import axios from 'axios';

import { test127 } from 'mocks/0000127';

import type { TournamentsApiResponse } from 'types/tournament';

export const getPokeDataTournament = async (
  tournamentId: string
): Promise<TournamentsApiResponse> => {
  // @ts-expect-error
  return test127;
  // const url = `https://www.pokedata.ovh/apiv2/division/masters+juniors+seniors/tcg/id/${tournamentId}`;
  // return axios.get(url).then(res => res.data);
};
