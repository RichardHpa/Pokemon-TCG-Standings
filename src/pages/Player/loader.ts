import { defer } from 'react-router-dom';

import { tournamentStandingsQuery } from 'queries/useGetTournamentStandings';

import type { QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router-dom';
import type { Division } from 'types/tournament';

interface Params {
  playerName: string;
  tournamentId: string;
  division: Division;
}

export const playerLoader =
  (client: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const typedParams = params as unknown as Params;
    if (!typedParams.playerName) {
      throw new Error('No playerName provided');
    }

    if (!typedParams.tournamentId) {
      throw new Error('No tournamentId provided');
    }

    if (!typedParams.division) {
      throw new Error('No division provided');
    }

    const tournamentStandingLoader = client.ensureQueryData(
      tournamentStandingsQuery({
        tournamentId: typedParams.tournamentId,
        division: typedParams.division,
      })
    );

    return defer({
      tournamentId: params.tournamentId,
      playerName: params.playerName,
      standings: tournamentStandingLoader,
      division: params.division,
    });
  };
