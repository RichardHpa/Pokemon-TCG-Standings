import { useEffect } from 'react';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';

import { Navbar } from 'components/Navbar';

import { About } from './pages';
import { Home } from 'pages/Home';
import { tournamentsLoader, Tournaments } from 'pages/Tournaments';
import { tournamentLoader, Tournament, TournamentOutlet } from 'pages/Tournament';
import { playerLoader, Player } from 'pages/Player';
import { divisionLoader, Division } from 'pages/Tournament/Division';

import { Images } from 'pages/images/Images';

import { DefaultError } from 'errors/DefaultError';

import { useAnalytics } from 'hooks/useAnalytics';

import { FetchingProvider } from 'context/FetchingContext';

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
    <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 px-4 flex flex-col flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <DefaultError />
      </div>
    ),
    children: [
      {
        index: true,
        loader: tournamentsLoader(queryClient),
        element: <Home />,
      },
      {
        path: 'images',
        element: <Images />,
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
                loader: tournamentLoader(queryClient),
                element: <Tournament />,
              },
              {
                path: ':division',
                children: [
                  {
                    index: true,
                    loader: divisionLoader(queryClient),
                    element: <Division />,
                  },
                  {
                    path: ':playerName',
                    loader: playerLoader(queryClient),
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
