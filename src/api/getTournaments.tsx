import axios from 'utils/axios';

import { baseLocalApi, tournamentsUrl } from 'constants/api';

import tournamentJSON from 'mocks/tempData/tournaments.json';

import { tournaments } from 'constants/tournaments';

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
    const reversed = [...resolvedResponse].reverse();

    reversed.forEach((tournament) => {
        const tournamentId = tournament.id;
        if (tournaments[tournamentId]) {
            if (tournaments[tournamentId].name) {
                tournament.name = tournaments[tournamentId].name;
            }
            if (tournaments[tournamentId].hasLocalData) {
                tournament.tournamentStatus = 'finished';
            }
        }
    });

    return reversed;
};
