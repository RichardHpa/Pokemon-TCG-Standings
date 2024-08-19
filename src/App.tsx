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
const noticeId = 'thank-you-notice';
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
          <Notice status="success" dismissible noticeId={noticeId} onDismiss={handleOnDismiss}>
            Thank you for those who have visited PTCG Standings during the 2024 Pokemon World
            Championships. I hope you found the information useful. <br />I apologize for the api
            issues that happened during the weekend, I really didn't expect the amount of traffic
            that came through and I am really grateful for it. I have already started working on a
            solution to prevent this from happening in the future. Thank you for your patience. If
            you have any feedback or suggestions, please feel free to reach out to me on X (Twitter)
            on{' '}
            <a
              href="https://twitter.com/RichardHpaNZ"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              @RichardHpaNZ
            </a>
            .<br />
            <br />
            If you would also like to help support the site you can do so by buying me a coffee via
            the above, or if you would like to help with the development of the site, please get in
            touch.
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
