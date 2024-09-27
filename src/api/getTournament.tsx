import axios from 'utils/axios';
import { baseLocalApi } from 'constants/api';

import type { TournamentsApiResponse } from 'types/tournament';

// chains 3 places where the data could be, locally, custom api, or pokedata api
export const getPokeDataTournament = async (
    tournamentId: string
): Promise<TournamentsApiResponse> => {
    const checkLocalFile = await axios
        .get(`/localData/tournaments/${tournamentId}.json`)
        .then((res) => res.data)
        .catch(() => null);

    if (checkLocalFile) {
        return checkLocalFile;
    }

    const checkCustomApi = await axios
        .get(`${baseLocalApi}/tournaments/${tournamentId}`)
        .then((res) => res.data)
        .catch(() => null);

    if (checkCustomApi) {
        return checkCustomApi;
    }

    const url = `https://www.pokedata.ovh/apiv2/division/masters+juniors+seniors/tcg/id/${tournamentId}`;
    const res = await axios.get(url);
    return res.data;
};
