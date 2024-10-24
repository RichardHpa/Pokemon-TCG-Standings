import { useEffect } from 'react';
import {
    Outlet,
    createBrowserRouter,
    RouterProvider,
    ScrollRestoration,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { Navbar } from 'components/Navbar';

import { About } from 'pages/About';
import { Home } from 'pages/Home';
import { Tournaments } from 'pages/Tournaments';
import { Tournament, TournamentOutlet } from 'pages/Tournament';
import { Player, Decklist, PlayerOutlet } from 'pages/Player';
import { Division } from 'pages/Tournament/Division';
import {
    WorldsPlayers2024,
    worldsLoader,
    WorldsOutlet,
    Worlds,
} from 'pages/Worlds';

import { Images } from 'pages/images/Images';

import { DefaultError } from 'errors/DefaultError';

import { useAnalytics } from 'hooks/useAnalytics';

import { FetchingProvider } from 'context/FetchingContext';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 15 minutes stale time
            staleTime: 1000 * 60 * 15,
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
                                element: <Division />,
                            },
                            {
                                path: ':division/:playerName',
                                element: <PlayerOutlet />,
                                children: [
                                    {
                                        index: true,
                                        element: <Player />,
                                    },
                                    {
                                        path: 'decklist',
                                        element: <Decklist />,
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
                    <RouterProvider
                        router={router}
                        fallbackElement={<Fallback />}
                    />
                </FetchingProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </ErrorBoundary>
    );
}

export default App;
