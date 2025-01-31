import { Heading } from 'components/Heading';
import { SEO } from 'components/SEO';
import { TournamentsCard } from 'components/TournamentsCard';
import { LoadingPokeball } from 'components/LoadingPokeball';
import { Notice } from 'components/Notice';

import { useGetTournamentByStatus } from 'hooks/useGetTournamentByStatus';

export const Home = () => {
    const { data, isError, isPending } = useGetTournamentByStatus();

    if (isError) {
        return (
            <Notice status="error">
                Error loading the tournaments. Please try again later
            </Notice>
        );
    }

    if (isPending) {
        return (
            <div className="flex flex-col justify-center items-center">
                <LoadingPokeball
                    size="100"
                    alt="Loading tournament info...</p>"
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <SEO />

            <Heading level="3">
                Keep up to date with the latest Pokemon TCG tournaments
            </Heading>

            {data.runningTournaments && data.runningTournaments.length > 0 && (
                <TournamentsCard
                    title="Tournaments currently in progress"
                    tournaments={data.runningTournaments}
                />
            )}

            {data.upComingTournaments &&
                data.upComingTournaments.length > 0 && (
                    <TournamentsCard
                        title="Upcoming Tournaments"
                        tournaments={data.upComingTournaments}
                    />
                )}

            {data.finishedTournaments &&
                data.finishedTournaments.length > 0 && (
                    <TournamentsCard
                        title="Latest Tournaments"
                        tournaments={data.finishedTournaments.slice(0, 6)}
                    />
                )}
        </div>
    );
};
