import { graphql } from 'msw';

import { tournaments } from './fixtures/tournaments';

// create a copy of the tournaments array to avoid modifying the original array, doing this means we can mock mutations
const mockTournaments = tournaments;

export const handlers = [
  graphql.query('GetTournamentsByStartDate', (req, res, ctx) => {
    const { sortDirection } = req.variables;

    const sortedTournaments = mockTournaments.sort((a, b) => {
      if (sortDirection === 'ASC') {
        return new Date(a.startDate) - new Date(b.startDate);
      }

      return new Date(b.startDate) - new Date(a.startDate);
    });

    return res(
      ctx.data({
        getTournamentsByStartDate: {
          items: sortedTournaments,
        },
      })
    );
  }),

  graphql.query('GetTournament', (req, res, ctx) => {
    const { id } = req.variables;
    const tournament = mockTournaments.find(t => t.id === id);

    return res(
      ctx.data({
        getTournament: tournament,
      })
    );
  }),

  graphql.mutation('UpdateTournament', (req, res, ctx) => {
    const { input } = req.variables;
    const id = input.id;
    const tournament = mockTournaments.find(t => t.id === id);

    if (!tournament) {
      return res(
        ctx.errors([
          {
            message: 'Tournament not found',
          },
        ])
      );
    }

    // we need to find the original tournament as we don't send the updated/created at fields
    const updatedTournament = {
      ...tournament,
      ...input,
    };

    mockTournaments.splice(mockTournaments.indexOf(tournament), 1, updatedTournament);

    return res(
      ctx.data({
        updateTournament: updatedTournament,
      })
    );
  }),

  graphql.mutation('DeleteTournament', (req, res, ctx) => {
    const { input } = req.variables;
    const id = input.id;
    const tournament = mockTournaments.find(t => t.id === id);

    if (!tournament) {
      return res(
        ctx.errors([
          {
            message: 'Tournament not found',
          },
        ])
      );
    }

    mockTournaments.splice(mockTournaments.indexOf(tournament), 1);

    return res(
      ctx.data({
        deleteTournament: {
          id,
        },
      })
    );
  }),
];
