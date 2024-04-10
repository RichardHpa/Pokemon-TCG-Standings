import { Link } from 'react-router-dom';

import { Heading } from 'components/Heading';
import { Card } from 'components/Card';

import { formatDate } from 'helpers/formatDate';

import { tournaments } from 'data/tournaments';

export const Tournaments = () => {
  return (
    <div className="flex flex-col gap-4">
      <Heading level="3">Latest Pokemon TCG Tournaments</Heading>

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
                    {tournament.name} {formatDate(tournament.startDate, 'yyyy')}
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(tournament.startDate, 'MMMM d, yyyy')} -{' '}
                      {formatDate(tournament.endDate, 'MMMM d, yyyy')}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
};
