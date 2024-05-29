import { defer } from 'react-router-dom';

import { tournamentsQuery } from 'queries/useGetTournaments';

import type { QueryClient } from '@tanstack/react-query';

// Load all the tournaments
export const tournamentsLoader = (client: QueryClient) => async () => {
  const tournamentsLoaderPromise = client.ensureQueryData(tournamentsQuery());

  return defer({
    tournaments: tournamentsLoaderPromise,
  });
};
