import { Heading } from 'components/Heading';
import { SEO } from 'components/SEO';
import { TournamentsCard } from 'components/TournamentsCard';

// import { useGetLatestTournaments } from 'hooks/useGetLatestTournaments';
import { useGetTournamentByStatus } from 'hooks/useGetTournamentByStatus';

export const Home = () => {
  const { data, isError, isLoading } = useGetTournamentByStatus();

  if (isError) {
    return <p>Error loading the tournaments</p>;
  }

  if (isLoading) {
    return <p>Loading tournament info...</p>;
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
