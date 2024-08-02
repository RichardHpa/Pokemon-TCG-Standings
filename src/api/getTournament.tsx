import axios from 'axios';

import type { Tournament } from 'types/tournament';

export const getPokeDataTournament = async (tournamentId: string): Promise<Tournament> => {
  const url = `https://www.pokedata.ovh/apiv2/id/${tournamentId}/tcg`;

  const response = await axios.get(url).then(res => {
    const data = res.data.tournament;
    return data;
  });

  return response;
};
