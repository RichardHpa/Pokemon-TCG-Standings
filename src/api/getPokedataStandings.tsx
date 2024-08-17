import axios from 'utils/axios';

import type { Standing } from 'types/standing';
import type { Division } from 'types/tournament';

export const getPokedataStandings = async ({
  tournamentId,
  division = 'masters',
}: {
  tournamentId: string;
  division: Division;
}): Promise<Standing[]> => {
  const url = `https://www.pokedata.ovh/apiv2/division/${division}/id/${tournamentId}/tcg`;

  const response = await axios.get(url).then(res => {
    const data = res.data.tournament_data[0].data;
    return data;
  });

  return response;
};
