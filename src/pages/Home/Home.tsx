import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import { Heading } from 'components/Heading';
import { SEO } from 'components/SEO';
import { TournamentsCard } from 'components/TournamentsCard';

import { PinnedPlayers } from './components/PinnedPlayers';

import { useGetLatestTournaments } from 'hooks/useGetLatestTournaments';
import { useGetTournamentByStatus } from 'hooks/useGetTournamentByStatus';

import type { Tournament } from 'types/tournament';

const HomeContent = () => {
  const { runningTournaments, finishedTournaments } = useGetTournamentByStatus();

  const latestTournaments = useGetLatestTournaments(finishedTournaments, 6);

  return (
    <div className="flex flex-col gap-4">
      <Heading level="3">Keep up to date with current Pokemon TCG tournaments</Heading>

      <PinnedPlayers />

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

export const Home = () => {
  const data = useLoaderData() as {
    tournaments: Tournament[];
  };

  return (
    <Suspense fallback={<p>Loading tournament info...</p>}>
      <SEO />
      <Await resolve={data.tournaments} errorElement={<p>Error loading the tournaments</p>}>
        <HomeContent />
      </Await>
    </Suspense>
  );
};
