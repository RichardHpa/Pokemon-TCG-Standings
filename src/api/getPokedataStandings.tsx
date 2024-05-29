import axios from 'axios';

import type { Standing } from 'types/standing';
import type { Division } from 'types/tournament';

export const getPokedataStandings = async ({
  tournamentId,
  division = 'masters',
}: {
  tournamentId: string;
  division: Division;
}) => {
  const url = `https://www.pokedata.ovh/apiv2/division/${division}/id/${tournamentId}`;

  const response = await axios.get(url).then(res => {
    const data = res.data[0].tournament_data[0].data;
    return data;
  });

  return response as Standing[];
};
