import { Suspense } from 'react';
import { Await, useLoaderData, Outlet, Link, useLocation } from 'react-router-dom';

import { Heading } from 'components/Heading';
import { Indicator } from 'components/Indicator';
import { Tabs, NavTab } from 'components/Tabs';

import { RUNNING } from 'constants/tournament';

import { formatDate } from 'helpers/formatDate';

import type { Tournament } from 'types/tournament';

export const TournamentOutlet = () => {
  const location = useLocation();
  const data = useLoaderData() as {
    tournamentId: string;
    tournament: Tournament;
  };

  const isBasePath = location.pathname === `/tournaments/${data.tournamentId}`;

  return (
    <Suspense fallback={<p>Loading Tournament...</p>}>
      <div className="flex flex-col gap-4 flex-grow">
        <Await resolve={data.tournament} errorElement={<p>Error loading your tournaments</p>}>
          {tournament => {
            return (
              <>
                <div className="flex justify-between">
                  <div className="mb-4">
                    <Link to={`/tournaments/${data.tournamentId}`}>
                      <Heading level="3" className="hover:underline cursor-pointer">
                        {tournament.name}
                      </Heading>
                    </Link>

                    <p className="text-gray-500 dark:text-gray-400">
                      {formatDate(tournament.date.start, 'MMMM d, yyyy')} -{' '}
                      {formatDate(tournament.date.end, 'MMMM d, yyyy')}
                    </p>
                  </div>
                  {tournament.tournamentStatus === RUNNING && <Indicator />}
                </div>

                <Tabs>
                  <NavTab to="masters" active={isBasePath}>
                    Masters{' '}
                    <span className="inline-flex items-center justify-center px-2 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                      {tournament.players.masters}
                    </span>
                  </NavTab>
                  <NavTab to="seniors">
                    Seniors{' '}
                    <span className="inline-flex items-center justify-center px-2 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                      {tournament.players.seniors}
                    </span>
                  </NavTab>
                  <NavTab to="juniors">
                    Juniors{' '}
                    <span className="inline-flex items-center justify-center px-2 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                      {tournament.players.juniors}
                    </span>
                  </NavTab>
                </Tabs>

                <Outlet />
              </>
            );
          }}
        </Await>
      </div>
    </Suspense>
  );
};
