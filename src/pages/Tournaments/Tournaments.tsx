import { Heading } from 'components/Heading';
import { SEO } from 'components/SEO';
import { TournamentsCard } from 'components/TournamentsCard';
import { LoadingPokeball } from 'components/LoadingPokeball';

import { useGetTournamentByStatus } from 'hooks/useGetTournamentByStatus';

export const Tournaments = () => {
    const { data, isError, isPending } = useGetTournamentByStatus();

    return (
        <div className="flex flex-col gap-4">
            <SEO title="TCG tournaments" />
            <Heading level="3">Latest Pokemon TCG Tournaments</Heading>

            {isError && <p>Error loading the tournaments</p>}
            {isPending && (
                <div className="flex flex-col justify-center items-center">
                    <LoadingPokeball
                        size="100"
                        alt="Loading standings...</p>"
                    />
                </div>
            )}

            {data && (
                <>
                    {data.runningTournaments &&
                        data.runningTournaments.length > 0 && (
                            <TournamentsCard
                                title="Running Tournaments"
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
                                tournaments={data.finishedTournaments}
                            />
                        )}
                </>
            )}
        </div>
    );
};
