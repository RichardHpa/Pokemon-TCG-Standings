import { http, HttpResponse, passthrough } from 'msw';

import { tournamentsUrl, basePokeDataUrl } from '../constants/api';

import { staticTournaments } from './tempData/tournaments';

export const handlers = [
  http.get(tournamentsUrl, () => {
    // return HttpResponse.json({}, { status: 404 });
    return HttpResponse.json(staticTournaments);
    // passthrough();
  }),

  http.get(`${basePokeDataUrl}/division/:divisions/tcg/id/:tournamentId`, async ({ params }) => {
    const tournamentId = params.tournamentId;
    if (!tournamentId) {
      return HttpResponse.json({}, { status: 404 });
    }

    const result = await fetch(`/localData/tournaments/${tournamentId}.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .catch(() => {
        return null;
      });

    if (result) {
      return HttpResponse.json(result);
    }

    passthrough();
  }),

  http.get(`${basePokeDataUrl}/division/:division/id/:tournamentId/tcg`, async ({ params }) => {
    const { tournamentId, division } = params;
    if (!tournamentId || !division) {
      return HttpResponse.json({}, { status: 404 });
    }

    const result = await fetch(`/localData/tournaments/${tournamentId}.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .catch(() => {
        return null;
      });

    if (result) {
      const data = result.tournament_data.find(
        (data: any) => data.division.toLowerCase() === division
      );
      return HttpResponse.json({
        type: 'tcg',
        tournament: result.tournament,
        tournament_data: [
          {
            division: division,
            data: data.data,
          },
        ],
      });
    }

    passthrough();
  }),
];
