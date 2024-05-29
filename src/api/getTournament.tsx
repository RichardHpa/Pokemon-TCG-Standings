import axios from 'axios';

import type { Tournament } from 'types/tournament';

export const getPokeDataTournament = async (tournamentId: string) => {
  const url = `https://www.pokedata.ovh/apiv2/id/${tournamentId}`;

  const response = await axios.get(url).then(res => {
    const data = res.data[0].tournament;
    return data;
  });

  return response as Tournament;
};
