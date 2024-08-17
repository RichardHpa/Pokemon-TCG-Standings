import axios from 'utils/axios';

import type { Tournament } from 'types/tournament';

const url = 'https://www.pokedata.ovh/apiv2/tcg/tournaments';

export const getPokeDataTournaments = async (): Promise<Tournament[]> => {
  const response = await axios.get(url).then(res => {
    const data = res.data.tcg.data;
    return data;
  });

  // the response comes in order from oldest to newest so we want to reverse it
  const reversed = response.reverse();

  return reversed;
};
