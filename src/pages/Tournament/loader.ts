import { defer } from 'react-router-dom';

// import { tournamentQuery } from 'queries/useGetTournament';

// import type { QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router-dom';

// Load all tournaments and find the one with the matching id
export const tournamentLoader =
  () =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.tournamentId) {
      throw new Error('No tournamentId provided');
    }

    // const tournamentLoaderPromise = client.ensureQueryData(tournamentQuery(params.tournamentId));
    return {
      tournamentId: params.tournamentId,
      // tournament: tournamentLoaderPromise,
    };
    // return defer({
    //   tournamentId: params.tournamentId,
    //   // tournament: tournamentLoaderPromise,
    // });
  };
