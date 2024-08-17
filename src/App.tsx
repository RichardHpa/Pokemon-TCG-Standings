import { useEffect, useCallback } from 'react';
import { Outlet, createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { Notice } from 'components/Notice';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { Navbar } from 'components/Navbar';

import { About } from './pages';
import { Home } from 'pages/Home';
import { Tournaments } from 'pages/Tournaments';
import { Tournament, TournamentOutlet } from 'pages/Tournament';
import { Player } from 'pages/Player';
import { Division } from 'pages/Tournament/Division';
import { WorldsPlayers2024, worldsLoader, WorldsOutlet, Worlds } from 'pages/Worlds';

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
const noticeId = 'apiNotice';
const Layout = () => {
  const { sendPageView } = useAnalytics();
  const [dismissedNotice, setDismissedNotice] = useLocalStorage(noticeId, 'false');

  useEffect(() => {
    sendPageView();
  }, [sendPageView]);

  const handleOnDismiss = useCallback(() => {
    setDismissedNotice('true');
  }, [setDismissedNotice]);

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 px-4 flex flex-col flex-grow">
        {dismissedNotice === 'false' && (
          <Notice status="info" dismissible noticeId={noticeId} onDismiss={handleOnDismiss}>
            I am aware of some users encountering a 404 error when trying to view the worlds 2024
            information.
            <br />I apologize for this inconvenience and have been working to resolve the issue. I
            have made a few changes to the site that should help prevent this from happening in the
            future, but I am still looking into a more permanent solution.
            <br />
            One way to help prevent the issue is to not reload the page often. The data will get
            automatically updated every 5 minutes so there should be no need to reload the page,
            which causes extra stress on the external api.
          </Notice>
        )}

        <Outlet />
      </div>
      <ScrollRestoration />
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
        path: 'worlds-2024',
        element: <WorldsOutlet />,
        children: [
          {
            index: true,
            element: <Worlds />,
          },
          {
            path: ':country',
            loader: worldsLoader,
            element: <WorldsPlayers2024 />,
          },
        ],
      },
      {
        path: 'tournaments',
        children: [
          {
            index: true,
            element: <Tournaments />,
          },
          {
            path: ':tournamentId',
            element: <TournamentOutlet />,
            children: [
              {
                index: true,
                element: <Tournament />,
              },
              {
                path: ':division',
                children: [
                  {
                    index: true,
                    element: <Division />,
                  },
                  {
                    path: ':playerName',
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
        </FetchingProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
