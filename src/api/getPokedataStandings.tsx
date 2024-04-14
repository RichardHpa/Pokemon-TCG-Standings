import axios from 'axios';

import type { Standing } from 'types/standing';

export const getPokedataStandings = async (tournamentId: string) => {
  // const url = `https://www.pokedata.ovh/api/complete/?id=${tournamentId}&game=tcg&division=masters`;
  // const url = `https://www.pokedata.ovh/standings/${tournamentId}/masters/${tournamentId}_Masters.json`;
  const url = `https://pokemonserver.fly.dev/standings/${tournamentId}`;

  const response = await axios.get(url).then(res => {
    const data = res.data;
    return data;
  });

  // return response.data.masters as Standing[];
  return response as Standing[];
};
