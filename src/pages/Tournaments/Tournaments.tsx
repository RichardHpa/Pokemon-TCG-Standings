import { Suspense } from 'react';
import { Link, useLoaderData, Await } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { Heading } from 'components/Heading';
import { ContentCard } from 'components/ContentCard';
import { SEO } from 'components/SEO';
import { Indicator } from 'components/Indicator';

import { useGetRunningTournaments } from 'hooks/useGetRunningTournaments';
import { useGetLatestTournaments } from 'hooks/useGetLatestTournaments';

import { tournamentsQuery } from 'queries/useGetTournaments';
import { RUNNING } from 'constants/tournament';

import { formatDate } from 'helpers/formatDate';

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
  const { data: tournaments } = useQuery(tournamentsQuery());

  const runningTournaments = useGetRunningTournaments(tournaments);
  const otherTournaments = useGetLatestTournaments(tournaments, -1);

  if (!tournaments) {
    return <p>No tournaments found</p>;
  }

  return (
    <>
      {runningTournaments.length > 0 && (
        <ContentCard title="Tournaments currently in progress">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {runningTournaments.map(tournament => {
              return (
                <li
                  className="py-3 sm:py-4 w-full items-center pl-3 pr-6  text-gray-700 cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400"
                  key={tournament.id}
                >
                  <Link to={`${tournament.id}`}>
                    <div className="flex items-center justify-between">
                      {tournament.name}

                      <div className="flex gap-2">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(tournament.date.start, 'MMMM d, yyyy')} -{' '}
                          {formatDate(tournament.date.end, 'MMMM d, yyyy')}
                        </div>
                        <Indicator />
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </ContentCard>
      )}

      {otherTournaments.length > 0 && (
        <ContentCard title="Completed Pokemon TCG Tournaments">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {otherTournaments.map(tournament => {
              return (
                <li
                  className="py-3 sm:py-4 w-full items-center pl-3 pr-6  text-gray-700 cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400"
                  key={tournament.id}
                >
                  <Link to={`${tournament.id}`}>
                    <div className="flex items-center justify-between">
                      {tournament.name}{' '}
                      {tournament.tournamentStatus === RUNNING && ' (In Progress)'}
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(tournament.date.start, 'MMMM d, yyyy')} -{' '}
                        {formatDate(tournament.date.end, 'MMMM d, yyyy')}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </ContentCard>
      )}
    </>
  );
};
