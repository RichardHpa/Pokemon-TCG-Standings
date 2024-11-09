import axios from 'utils/axios';

import { baseLocalApi, tournamentsUrl } from 'constants/api';

import tournamentJSON from 'mocks/tempData/tournaments.json';

import type { Tournament, TournamentsApiResponse } from 'types/tournament';

// sometimes we want to force the use of local data
const useLocalData = false;

export const getPokeDataTournaments = async (): Promise<Tournament[]> => {
    const fixedTournaments = tournamentJSON as TournamentsApiResponse;
    let response;
    if (useLocalData) {
        response = fixedTournaments.tcg.data;
    } else {
        response = await axios
            .get(`${baseLocalApi}/tournaments`)
            .then((customApiDataRes) => {
                const data = customApiDataRes.data.tcg.data;
                return data;
            })
            .catch(async () => {
                const res = await axios.get(tournamentsUrl);
                const data = res.data.tcg.data;
                if (!data) return null;
                return data;
            });
    }

    const resolvedResponse = response || fixedTournaments.tcg.data;

    // the response comes in order from oldest to newest so we want to reverse it
    const reversed = resolvedResponse.reverse();

    // there is an issue with the data where the 2025 Lima TCG Special Event where the data is incorrect, I have hardcoded some data for it but we need to tell it to be finished if its in the list
    const limaSpecialEvent = reversed.findIndex(
        (tournament: Tournament) => tournament.id === '0000132'
    );

    if (limaSpecialEvent !== -1) {
        reversed[limaSpecialEvent].tournamentStatus = 'finished';
    }

    return reversed;
};
