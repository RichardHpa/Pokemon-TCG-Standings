import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';

import { Heading } from 'components/Heading';
import { SEO } from 'components/SEO';
import { TournamentsCard } from 'components/TournamentsCard';
import { useGetTournamentByStatus } from 'hooks/useGetTournamentByStatus';

import type { Tournament as TournamentType } from 'types/tournament';

export const Tournaments = () => {
  const data = useLoaderData() as {
    tournaments: TournamentType[];
  };

  return (
    <div className="flex flex-col gap-4">
      <SEO title="TCG tournaments" />
      <Heading level="3">Latest Pokemon TCG Tournaments</Heading>

      <Suspense fallback={<p>Loading Tournaments...</p>}>
        <Await resolve={data.tournaments} errorElement={<p>Error loading the tournaments</p>}>
          <TournamentsList />
        </Await>
      </Suspense>
    </div>
  );
};

const TournamentsList = () => {
  const { runningTournaments, finishedTournaments, upComingTournaments } =
    useGetTournamentByStatus();

  return (
    <>
      {runningTournaments && runningTournaments.length > 0 && (
        <TournamentsCard
          title="Tournaments currently in progress"
          tournaments={runningTournaments}
        />
      )}

      {upComingTournaments && upComingTournaments.length > 0 && (
        <TournamentsCard title="Upcoming Tournaments" tournaments={upComingTournaments} />
      )}

      {finishedTournaments && finishedTournaments.length > 0 && (
        <TournamentsCard title="Latest Tournaments" tournaments={finishedTournaments} />
      )}
    </>
  );
};
