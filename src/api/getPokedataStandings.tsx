import axios from 'axios';

import type { Standing } from 'types/standing';

export const getPokedataStandings = async (tournamentId: string) => {
  const url = `https://www.pokedata.ovh/api/complete/?id=${tournamentId}&game=tcg&division=masters`;

  const response = await axios.get(url).then(res => {
    const data = res.data;
    return data;
  });

  return response.data.masters as Standing[];
};
