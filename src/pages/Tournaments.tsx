import { Suspense } from 'react';
import { Link, useLoaderData, Await } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { Heading } from 'components/Heading';
import { Card } from 'components/Card';

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

  if (!tournaments) {
    return <p>No tournaments found</p>;
  }

  return (
    <Card>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {tournaments.map(tournament => {
          return (
            <li
              className="py-3 sm:py-4 px-4 cursor-pointer hover:bg-gray-100 hover:text-blue-700 dark:hover:bg-gray-600 dark:hover:text-white"
              key={tournament.id}
            >
              <Link to={`${tournament.id}`}>
                <div className="flex items-center justify-between">
                  {tournament.name} {tournament.tournamentStatus === RUNNING && ' (In Progress)'}
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
    </Card>
  );
};