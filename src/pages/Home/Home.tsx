import { Suspense } from 'react';
import { Await, useLoaderData, Link } from 'react-router-dom';

import { ContentCard } from 'components/ContentCard';
import { Heading } from 'components/Heading';
import { Indicator } from 'components/Indicator';

import { useGetTournaments } from 'queries/useGetTournaments';

import { useGetRunningTournaments } from 'hooks/useGetRunningTournaments';
import { useGetLatestTournaments } from 'hooks/useGetLatestTournaments';
import { formatDate } from 'helpers/formatDate';

import type { Tournament } from 'types/tournament';

const HomeContent = () => {
  const { data } = useGetTournaments();

  const runningTournaments = useGetRunningTournaments(data);
  const latestTournaments = useGetLatestTournaments(data, 6);

  if (!data) return <p>No tournaments found</p>;

  return (
    <div className="flex flex-col gap-4">
      <Heading level="3">Keep up to date with current Pokemon TCG tournaments</Heading>
      {runningTournaments.length > 0 && (
        <ContentCard title="Tournaments currently in progress">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {runningTournaments.map(tournament => {
              return (
                <li
                  key={tournament.id}
                  className="w-full items-center pl-3 pr-6  text-gray-700 cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400"
                >
                  <Link to={`tournaments/${tournament.id}`}>
                    <div className="flex justify-between py-6">
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {tournament.name}
                      </div>

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

      {latestTournaments.length > 0 && (
        <ContentCard title="Latest Tournaments">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {latestTournaments.map(tournament => {
              return (
                <li
                  key={tournament.id}
                  className=" w-full items-center pl-3 pr-6  text-gray-700 cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400"
                >
                  <Link to={`tournaments/${tournament.id}`}>
                    <div className="flex justify-between py-6">
                      <div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {tournament.name}
                        </div>
                        <div>Masters winner: {tournament.winners.masters}</div>
                        <div>Seniors winner: {tournament.winners.seniors}</div>
                        <div>Juniors winner: {tournament.winners.juniors}</div>
                      </div>

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
    </div>
  );
};

export const Home = () => {
  const data = useLoaderData() as {
    tournaments: Tournament[];
  };

  return (
    <Suspense fallback={<p>Loading tournament info...</p>}>
      <Await resolve={data.tournaments} errorElement={<p>Error loading the tournaments</p>}>
        <HomeContent />
      </Await>
    </Suspense>
  );
};
