import { Outlet, Link, useLocation, useParams } from 'react-router-dom';

import { Heading } from 'components/Heading';
import { Indicator } from 'components/Indicator';
import { Tabs, NavTab } from 'components/Tabs';

import { RUNNING, NOT_STARTED } from 'constants/tournament';
import { tournaments } from 'constants/tournaments';

import { useGetTournament } from 'queries/useGetTournament';

import { formatDate } from 'helpers/formatDate';

export const TournamentOutlet = () => {
  const location = useLocation();
  const { tournamentId } = useParams() as { tournamentId: string };

  const { data: tournament, isLoading, isError } = useGetTournament(tournamentId);

  const isBasePath = location.pathname === `/tournaments/${tournamentId}`;

  if (isLoading) {
    return <p>Loading Tournament...</p>;
  }

  if (isError || !tournament) {
    return <p>Error loading your tournaments</p>;
  }

  return (
    <div className="flex flex-col gap-4 flex-grow">
      <div className="flex justify-between mb-4">
        <div className="grid sm:grid-cols-[auto_auto] place-content-start gap-4">
          {tournaments[tournamentId] && (
            <div className="hidden sm:block">
              <img
                src={tournaments[tournamentId].logo}
                alt={tournament.name}
                className="h-0 min-h-full object-contain"
              />
            </div>
          )}

          <div>
            <Link to={`/tournaments/${tournamentId}`}>
              <Heading level="3" className="hover:underline cursor-pointer">
                {tournament.name}
              </Heading>
            </Link>

            <p className="text-gray-500 dark:text-gray-400">
              {formatDate(tournament.date.start, 'MMMM d, yyyy')} -{' '}
              {formatDate(tournament.date.end, 'MMMM d, yyyy')}
            </p>
          </div>
        </div>

        {tournament.tournamentStatus === RUNNING && <Indicator />}
      </div>

      {tournament.tournamentStatus === NOT_STARTED ? (
        <>
          <Heading level="4">Tournament has not started yet</Heading>
          <p className="text-gray-500 dark:text-gray-400">
            More information will be provided once the first round standings have been released.
          </p>
        </>
      ) : (
        <>
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
      )}
    </div>
  );
};
