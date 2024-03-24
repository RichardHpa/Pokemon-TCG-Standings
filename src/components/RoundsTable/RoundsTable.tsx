import type { RoundsTableProps } from './types';
import type { FC } from 'react';

import { colorMap } from 'utils/ColorMap';

export const RoundsTable: FC<RoundsTableProps> = ({ rounds }) => {
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {Object.keys(rounds)
        .reverse()
        .map(round => {
          return (
            <li className="py-3 sm:py-4" key={round}>
              <div className="flex items-center">
                <div className="flex-1 min-w-0 mx-2">
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Round {round} - Table {rounds[round].table}
                  </p>
                  <div className="flex justify-between">
                    <p>{rounds[round].name}</p>
                    <p className={colorMap[rounds[round].result]}>{rounds[round].result}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};
