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
    const { sendPageView, sendEvent } = useAnalytics();
    const noticeId = `beta-message`;
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

    const handleOnBetaClick = useCallback(() => {
        sendEvent({
            category: 'Beta Link',
            action: 'Clicked on Beta Lin',
        });
    }, [sendEvent]);

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
                        Thank you for visiting PTCG Standings. I am happy to say
                        we are close to launching the next version of the site.
                        I am putting the new site up for a beta test for the
                        next couple tournaments. Feel free to check it out at{' '}
                        <u>
                            <a
                                href="https://ptcg-standings.fly.dev/"
                                target="_blank"
                                onClick={handleOnBetaClick}
                            >
                                https://ptcg-standings.fly.dev
                            </a>
                        </u>
                        . If you have any feedback or suggestions, please feel
                        free to reach out to me on X{' '}
                        <u>
                            <a
                                href="https://x.com/PTCG_Standings"
                                target="_blank"
                            >
                                @PTCG_Standings
                            </a>
                        </u>
                        . I would love to hear from you.
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
