import { useEffect } from 'react';
import { Outlet, createBrowserRouter, RouterProvider, defer } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { Amplify } from 'aws-amplify';

import { AuthLayout } from 'layouts/AuthLayout';
import { Navbar } from 'components/Navbar';

// TODO: refactor these to also include loaders
import { Player, Tournaments, Tournament, About } from './pages';
import { Home } from 'pages/Home';
import { TournamentOutlet } from 'pages/Tournament';
import { Division, divisionLoader } from 'pages/Admin/Division';
import {
  Tournament as AdminTournament,
  EditTournament,
  tournamentLoader as adminTournamentLoader,
} from 'pages/Admin/Tournament';

import { DefaultError } from 'errors/DefaultError';

import { tournamentsQuery } from 'queries/useGetTournaments';
import { tournamentQuery } from 'queries/useGetTournament';
import { tournamentStandingsQuery } from 'queries/useGetTournamentStandings';

import { useAnalytics } from 'hooks/useAnalytics';

import { FetchingProvider } from 'context/FetchingContext';
import config from './amplifyconfiguration.json';

import type { QueryClient as QueryClientType } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router-dom';

Amplify.configure(config);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const Layout = () => {
  const { sendPageView } = useAnalytics();

  useEffect(() => {
    sendPageView();
  }, [sendPageView]);

  return (
    <div className="">
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

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen flex flex-col">
        <Outlet />
      </div>
    ),
    errorElement: (
      <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen flex flex-col">
        <DefaultError />
      </div>
    ),
    children: [
      {
        path: 'dashboard',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <div>Dashboard</div>,
          },
          {
            path: 'division',
            element: <Outlet />,
            children: [
              {
                path: ':division',
                children: [
                  {
                    index: true,
                    loader: divisionLoader,
                    element: <Division />,
                  },
                  {
                    path: ':tournamentId',
                    children: [
                      {
                        index: true,
                        loader: adminTournamentLoader(queryClient),
                        element: <AdminTournament />,
                      },
                      {
                        path: 'edit',
                        loader: adminTournamentLoader(queryClient),
                        element: <EditTournament />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <Layout />,
        children: [
          {
            index: true,
            loader: tournamentsLoader(queryClient),
            element: <Home />,
          },

          {
            path: 'about',
            element: <About />,
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

      {
        path: '*',
        element: <DefaultError />,
      },
    ],
  },
]);

export function Fallback() {
  return <p>Performing initial data load</p>;
}

function fallbackRender({ error }: { error: Error }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <QueryClientProvider client={queryClient}>
        <FetchingProvider>
          <RouterProvider router={router} fallbackElement={<Fallback />} />
          <ReactQueryDevtools />
        </FetchingProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
