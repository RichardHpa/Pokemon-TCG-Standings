import { Heading } from 'components/Heading';
import { SEO } from 'components/SEO';
import { TournamentsCard } from 'components/TournamentsCard';

// import { PinnedPlayers } from './components/innedPlayers';

import { useGetLatestTournaments } from 'hooks/useGetLatestTournaments';
import { useGetTournamentByStatus } from 'hooks/useGetTournamentByStatus';

export const Home = () => {
  const { runningTournaments, finishedTournaments, isError, isLoading } =
    useGetTournamentByStatus();

  const latestTournaments = useGetLatestTournaments(finishedTournaments, 6);

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

      {/* <PinnedPlayers /> */}

      {runningTournaments && runningTournaments.length > 0 && (
        <TournamentsCard
          title="Tournaments currently in progress"
          tournaments={runningTournaments}
        />
      )}

      {latestTournaments && latestTournaments.length > 0 && (
        <TournamentsCard title="Latest Tournaments" tournaments={latestTournaments} />
      )}
    </div>
  );
};
