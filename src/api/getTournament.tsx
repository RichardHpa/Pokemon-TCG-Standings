import axios from 'axios';

import type { Tournament } from 'types/tournament';

export const getPokeDataTournament = async (tournamentId: string) => {
  const url = `https://www.pokedata.ovh/apiv2/division/masters+juniors+seniors/tcg/id/${tournamentId}`;
  return axios.get(url).then(res => res.data);
};
