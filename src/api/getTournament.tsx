import axios from 'utils/axios';
// import { runningTournaments } from 'constants/runningTournaments';
// import { baseLocalApi } from 'constants/api';

import type { TournamentsApiResponse } from 'types/tournament';

export const getPokeDataTournament = async (
    tournamentId: string
): Promise<TournamentsApiResponse> => {
    // if (runningTournaments.length > 0 && runningTournaments.includes(tournamentId)) {
    //   const url = `${baseLocalApi}/tournaments/${tournamentId}`;
    //   return axios.get(url).then(res => res.data);
    // }
    const url = `https://www.pokedata.ovh/apiv2/division/masters+juniors+seniors/tcg/id/${tournamentId}`;
    return axios.get(url).then((res) => res.data);
};
