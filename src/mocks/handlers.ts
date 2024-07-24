import { http, HttpResponse, passthrough } from 'msw';

import { tournamentsUrl, basePokeDataUrl } from '../constants/api';

export const handlers = [
  http.get(tournamentsUrl, () => {
    passthrough();
    // return HttpResponse.json({
    //   tcg: {
    //     data: [],
    //   },
    // });
  }),

  http.get(`${basePokeDataUrl}/id/:tournamentId`, ({ params }) => {
    const tournamentId = params.tournamentId;
    if (!tournamentId) {
      return HttpResponse.json({}, { status: 404 });
    }

    // return HttpResponse.json([
    //   {
    //     type: 'tcg',
    //     tournament: {},
    //     tournament_data: [],
    //   },
    // ]);
    passthrough();
  }),

  http.get(`${basePokeDataUrl}/division/:division/id/:tournamentId`, ({ params }) => {
    const { tournamentId, division } = params;
    if (!tournamentId || !division) {
      return HttpResponse.json({}, { status: 404 });
    }

    // return HttpResponse.json([
    //   {
    //     type: 'tcg',
    //     tournament: {},
    //     tournament_data: [
    //       {
    //         division: division,
    //         data: [],
    //       },
    //     ],
    //   },
    // ]);
    passthrough();
  }),
];
