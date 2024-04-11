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
            <li className="pl-3 pr-6 py-4" key={round}>
              <div className="flex justify-between align-top">
                <div>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Round {round} - Table {rounds[round].table}
                  </p>
                  <p>{rounds[round].name}</p>
                </div>
                <p className={`${colorMap[rounds[round].result]} font-bold`}>
                  {rounds[round].result}
                </p>
              </div>
            </li>
          );
        })}
    </ul>
  );
};
