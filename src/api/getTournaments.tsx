import axios from 'axios';

import type { Tournament } from 'types/tournament';

export const getPokeDataTournaments = async () => {
  const url = 'https://pokedata.ovh/standings/tournaments/';

  const response = await axios.get(url).then(res => {
    const data = res.data as Tournament[];
    return data;
  });

  // the response comes in order from oldest to newest so we want to reverse it
  const reversed = response.reverse();

  return reversed;
};
