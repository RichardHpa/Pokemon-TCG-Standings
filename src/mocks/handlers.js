import { graphql } from 'msw';

import { tournaments } from './fixtures/tournaments';

export const handlers = [
  graphql.query('TournamentsByPokeDataId', (req, res, ctx) => {
    return res(
      ctx.data({
        tournamentsByPokeDataId: {
          items: tournaments,
        },
      })
    );
  }),

  graphql.query('GetTournament', (req, res, ctx) => {
    const id = req.variables.id;
    const tournament = tournaments.find(tournament => tournament.id === id);
    return res(
      ctx.data({
        getTournament: tournament,
      })
    );
  }),
];
