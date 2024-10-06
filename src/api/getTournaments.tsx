import axios from 'utils/axios';

import { baseLocalApi, tournamentsUrl } from 'constants/api';
import { staticTournaments } from 'mocks/tempData/tournaments';

import type { Tournament } from 'types/tournament';

export const getPokeDataTournaments = async (): Promise<Tournament[]> => {
    const response = await axios
        .get(`${baseLocalApi}/tournaments`)
        .then((customApiDataRes) => {
            const data = customApiDataRes.data.tcg.data;
            return data;
        })
        .catch(async () => {
            const res = await axios.get(tournamentsUrl);
            const data = res.data.tcg.data;
            return data;
        });

    if (!response) {
        return staticTournaments.tcg.data.reverse();
    }

    // the response comes in order from oldest to newest so we want to reverse it
    const reversed = response.reverse();

    // remove 0000132
    const filtered = reversed.filter(
        (tournament: Tournament) => tournament.id !== '0000132'
    );

    return filtered;
};
