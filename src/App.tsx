import { Outlet, createHashRouter, RouterProvider, defer } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Navbar } from 'components/Navbar';

import { Player, Tournaments, Tournament } from './pages';
import { TournamentOutlet } from 'pages/Tournament';

import { tournamentsQuery } from 'queries/useGetTournaments';
import { tournamentQuery } from 'queries/useGetTournament';
import { tournamentStandingsQuery } from 'queries/useGetTournamentStandings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { FetchingProvider } from 'context/FetchingContext';

import type { QueryClient as QueryClientType } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const Layout = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 px-4 flex flex-col flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

// Loaders
// Load all the tournaments
export const tournamentsLoader = (client: QueryClientType) => async () => {
  const tournamentsLoaderPromise = client.ensureQueryData(tournamentsQuery());

  return defer({
    tournaments: tournamentsLoaderPromise,
  });
};

// Load all tournaments and find the one with the matching id
export const tournamentLoader =
  (client: QueryClientType) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.tournamentId) {
      throw new Error('No tournamentId provided');
    }

    const tournamentLoaderPromise = client.ensureQueryData(tournamentQuery(params.tournamentId));

    return defer({
      tournamentId: params.tournamentId,
      tournament: tournamentLoaderPromise,
    });
  };

export const singleTournamentLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.tournamentId) {
    throw new Error('No tournamentId provided');
  }

  return {
    tournamentId: params.tournamentId,
  };
};

export const singlePlayerLoader =
  (client: QueryClientType) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.playerName) {
      throw new Error('No playerName provided');
    }

    if (!params.tournamentId) {
      throw new Error('No tournamentId provided');
    }

    const tournamentStandingLoader = client.ensureQueryData(
      tournamentStandingsQuery(params.tournamentId)
    );

    return defer({
      tournamentId: params.tournamentId,
      playerName: params.playerName,
      standings: tournamentStandingLoader,
    });
  };

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <>home</>,
      },
      {
        path: 'tournaments',
        children: [
          {
            index: true,
            loader: tournamentsLoader(queryClient),
            element: <Tournaments />,
          },
          {
            path: ':tournamentId',
            loader: tournamentLoader(queryClient),
            element: <TournamentOutlet />,
            children: [
              {
                index: true,
                loader: singleTournamentLoader,
                element: <Tournament />,
              },
              {
                path: ':playerName',
                loader: singlePlayerLoader(queryClient),
                element: <Player />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export function Fallback() {
  return <p>Performing initial data load</p>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchingProvider>
        <RouterProvider router={router} fallbackElement={<Fallback />} />
        <ReactQueryDevtools />
      </FetchingProvider>
    </QueryClientProvider>
  );
}

export default App;
