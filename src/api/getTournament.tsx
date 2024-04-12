import axios from 'axios';

import type { Tournament } from 'types/tournament';

export const getPokeDataTournament = async (tournamentId: string) => {
  const url = `https://pokedata.ovh/standings/tournaments/?${tournamentId}`;

  const response = await axios.get(url).then(res => {
    const data = res.data as Tournament;
    return data;
  });

  return response;
};
