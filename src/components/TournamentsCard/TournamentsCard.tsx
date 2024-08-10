import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { ContentCard } from 'components/ContentCard';
import { Indicator } from 'components/Indicator';

import { RUNNING, NOT_STARTED } from 'constants/tournament';
// import { formatDate } from 'helpers/formatDate';

import type { TournamentsCardProps } from './types';
import type { FC } from 'react';
import type { Tournament } from 'types/tournament';

const TournamentCardInner = ({ tournament }: { tournament: Tournament }) => {
  return (
    <div className="flex justify-between py-6">
      <div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {tournament.name}
        </div>
        {tournament.winners.masters && <div>Masters winner: {tournament.winners.masters}</div>}

        {tournament.winners.seniors && <div>Seniors winner: {tournament.winners.seniors}</div>}

        {tournament.winners.juniors && <div>Juniors winner: {tournament.winners.juniors}</div>}
      </div>

      <div className="flex gap-2">
        {/* <div className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(tournament.date.start, 'MMMM d, yyyy')} -{' '}
          {formatDate(tournament.date.end, 'MMMM d, yyyy')}
        </div> */}

        {tournament.tournamentStatus === RUNNING && <Indicator />}
      </div>
    </div>
  );
};

export const TournamentsCard: FC<TournamentsCardProps> = ({ title, tournaments }) => {
  return (
    <ContentCard title={title}>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {tournaments.map(tournament => {
          return (
            <li
              key={tournament.id}
              className={clsx(
                'w-full items-center pl-3 pr-6 text-gray-700  border-b border-gray-100 dark:border-gray-800 dark:text-gray-400',
                {
                  'cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900':
                    tournament.tournamentStatus !== NOT_STARTED,
                }
              )}
            >
              {tournament.tournamentStatus !== NOT_STARTED ? (
                <Link to={`/tournaments/${tournament.id}`}>
                  <TournamentCardInner tournament={tournament} />
                </Link>
              ) : (
                <TournamentCardInner tournament={tournament} />
              )}
            </li>
          );
        })}
      </ul>
    </ContentCard>
  );
};
