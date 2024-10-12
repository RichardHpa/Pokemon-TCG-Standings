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

    // there is an issue with the data where the 2025 Lima TCG Special Event where the data is incorrect, I have hardcoded some data for it but we need to tell it to be finished if its in the list
    const limaSpecialEvent = reversed.findIndex(
        (tournament: Tournament) => tournament.id === '0000132'
    );

    if (limaSpecialEvent !== -1) {
        reversed[limaSpecialEvent].tournamentStatus = 'finished';
    }

    return reversed;
};
