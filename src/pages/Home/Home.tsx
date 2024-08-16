import { Heading } from 'components/Heading';
import { SEO } from 'components/SEO';
import { TournamentsCard } from 'components/TournamentsCard';
import { LoadingPokeball } from 'components/LoadingPokeball';
import { Notice } from 'components/Notice';

import { useGetTournamentByStatus } from 'hooks/useGetTournamentByStatus';

export const Home = () => {
  const { data, isError, isLoading } = useGetTournamentByStatus();

  if (isError) {
    return <Notice status="error">Error loading the tournaments. Please try again later</Notice>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <LoadingPokeball size="100" alt="Loading tournament info...</p>" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <SEO />

      <Heading level="3">Keep up to date with current Pokemon TCG tournaments</Heading>

      {data && (
        <>
          {data.runningTournaments.length > 0 && (
            <TournamentsCard
              title="Tournaments currently in progress"
              tournaments={data.runningTournaments}
            />
          )}

          {data.finishedTournaments.length > 0 && (
            <TournamentsCard
              title="Latest Tournaments"
              tournaments={data.finishedTournaments.slice(0, 6)}
            />
          )}
        </>
      )}
    </div>
  );
};
