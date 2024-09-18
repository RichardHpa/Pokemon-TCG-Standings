import axios from 'utils/axios';

import { baseLocalApi } from 'constants/api';
import { runningTournaments } from 'constants/runningTournaments';

import type { Tournament } from 'types/tournament';

const url =
  runningTournaments.length === 0
    ? 'https://www.pokedata.ovh/apiv2/tcg/tournaments'
    : `${baseLocalApi}/tournaments`;

export const getPokeDataTournaments = async (): Promise<Tournament[]> => {
  const response = await axios.get(url).then(res => {
    const data = res.data.tcg.data;
    return data;
  });

  // the response comes in order from oldest to newest so we want to reverse it
  const reversed = response.reverse();

  return reversed;
};
