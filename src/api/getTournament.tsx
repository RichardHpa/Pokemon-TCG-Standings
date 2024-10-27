import axios from 'utils/axios';
import { baseLocalApi } from 'constants/api';

import { tournaments } from 'constants/tournaments';

import type { TournamentApiResponse } from 'types/tournament';

// chains 3 places where the data could be, locally, custom api, or pokedata api
export const getPokeDataTournament = async (
    tournamentId: string
): Promise<TournamentApiResponse> => {
    const tournament = tournaments[tournamentId];
    if (tournament && tournament.hasLocalData === true) {
        const localData = await import(
            `../data/tournaments/${tournamentId}.json`
        ).then((data) => {
            return data.default;
        });
        return localData;
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
