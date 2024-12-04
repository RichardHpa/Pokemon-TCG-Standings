import { useEffect, useCallback } from 'react';
import {
    Outlet,
    createBrowserRouter,
    RouterProvider,
    ScrollRestoration,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';

import { useLocalStorage } from 'hooks/useLocalStorage';

import { PinnedPlayersProvider } from 'providers/PinnedPlayersProviderV2';

import { Navbar } from 'components/Navbar';
import { LoadingPokeball } from 'components/LoadingPokeball';
import { Heading } from 'components/Heading';
import { Notice } from 'components/Notice';

import { Home } from 'pages/Home';

import { TournamentOutlet } from 'pages/Tournament';
import { PlayerOutlet } from 'pages/Player';
import { worldsLoader, WorldsOutlet } from 'pages/Worlds';

import { DefaultError } from 'errors/DefaultError';

import { useAnalytics } from 'hooks/useAnalytics';

import { FetchingProvider } from 'context/FetchingContext';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 2 min stale time for non production -- means it will be 2 min in staging
            staleTime:
                import.meta.env.MODE === 'production'
                    ? 1000 * 60 * 15
                    : 1000 * 60 * 2,
        },
    },
});

const Layout = () => {
    const { sendPageView } = useAnalytics();
    const noticeId = `thank-you-2024`;
    const [dismissedNotice, setDismissedNotice] = useLocalStorage(
        noticeId,
        'false'
    );

    const handleOnDismiss = useCallback(() => {
        // @ts-expect-error -- not sure why this is throwing an error
        setDismissedNotice('true');
    }, [setDismissedNotice]);

    useEffect(() => {
        sendPageView();
    }, [sendPageView]);

    return (
        <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen flex flex-col">
            <Navbar />
            <div className="container mx-auto py-12 px-4 flex flex-col flex-grow">
                {dismissedNotice === 'false' && (
                    <Notice
                        status="info"
                        dismissible
                        noticeId={noticeId}
                        onDismiss={handleOnDismiss}
                    >
                        Thank you so much for those who have been using PTCG
                        Standings over the last few months. We have seen a
                        steady amount of traffic over this time and have got
                        some really useful feedback.
                        <br />
                        We have updated some of the UI, fixed API issues and
                        resolved multiple little bugs which have made the site
                        more stable.
                        <br />
                        <br />I am also happy to announce the biggest update to
                        the site coming in 2025. In the new year I will be
                        pushing up an update that will give us a full redesign
                        of the entire site, more ways to interact with data,
                        statistics of each tournament. And also early in the
                        year the ability to view round specific data. And mid
                        2025 our very own API which will allow the site to be
                        more stable as well as provide more data. These update
                        may require the site to go down for a short period of
                        time but I will make sure it happens over a period where
                        no tournament are running. Once again thank you all so
                        much for using the site and I can't wait to see it grow
                        in 2025
                        <br />
                        <br />- Richard from Ptcg Standings
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
                // element: <Images />,
                async lazy() {
                    const { Images } = await import('pages/images/Images');
                    return { Component: Images };
                },
            },
            {
                path: 'about',
                // element: <About />,
                async lazy() {
                    const { About } = await import('pages/About');
                    return { Component: About };
                },
            },
            {
                path: 'worlds-2024',
                element: <WorldsOutlet />,
                children: [
                    {
                        index: true,
                        // element: <Worlds />,
                        async lazy() {
                            const { Worlds } = await import('pages/Worlds');
                            return { Component: Worlds };
                        },
                    },
                    {
                        path: ':country',
                        loader: worldsLoader,
                        async lazy() {
                            const { WorldsPlayers2024 } = await import(
                                'pages/Worlds'
                            );
                            return { Component: WorldsPlayers2024 };
                        },
                    },
                ],
            },
            {
                path: 'tournaments',
                children: [
                    {
                        index: true,
                        // element: <Tournaments />,
                        async lazy() {
                            const { Tournaments } = await import(
                                'pages/Tournaments'
                            );
                            return { Component: Tournaments };
                        },
                    },
                    {
                        path: ':tournamentId',
                        element: <TournamentOutlet />,
                        children: [
                            {
                                index: true,
                                // element: <Tournament />,
                                async lazy() {
                                    const { Tournament } = await import(
                                        'pages/Tournament'
                                    );
                                    return { Component: Tournament };
                                },
                            },
                            {
                                path: ':division',
                                // element: <Division />,
                                async lazy() {
                                    const { Division } = await import(
                                        'pages/Tournament/Division'
                                    );
                                    return { Component: Division };
                                },
                            },
                            {
                                path: ':division/:playerName',
                                element: <PlayerOutlet />,
                                children: [
                                    {
                                        index: true,
                                        // element: <Player />,
                                        async lazy() {
                                            const { Player } = await import(
                                                'pages/Player'
                                            );
                                            return { Component: Player };
                                        },
                                    },
                                    {
                                        path: 'decklist',
                                        // element: <Decklist />,
                                        async lazy() {
                                            const { Decklist } = await import(
                                                'pages/Player'
                                            );
                                            return { Component: Decklist };
                                        },
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

const Fallback = () => (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
        <LoadingPokeball alt="Loading app" size="100" />
        <Heading level="2" className="mt-4">
            Loading PTCG Standings...
        </Heading>
    </div>
);

function fallbackRender() {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <DefaultError />
        </div>
    );
}

function App() {
    return (
        <ErrorBoundary fallbackRender={fallbackRender}>
            <QueryClientProvider client={queryClient}>
                <PinnedPlayersProvider>
                    <FetchingProvider>
                        <RouterProvider
                            router={router}
                            fallbackElement={<Fallback />}
                        />
                    </FetchingProvider>
                    <ReactQueryDevtools />
                </PinnedPlayersProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}

export default App;
