import clsx from 'clsx';

import { colorMap } from 'utils/ColorMap';

import type { FC } from 'react';
import type { PlayerRecordProps } from './types';

export const PlayerRecord: FC<PlayerRecordProps> = ({ record, colors = false }) => {
  return (
    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
      <span
        className={clsx({
          [colorMap.W]: colors && record.wins,
        })}
      >
        {record.wins}
      </span>
      -
      <span
        className={clsx({
          [colorMap.L]: colors && record.losses,
        })}
      >
        {record.losses}
      </span>
      -
      <span
        className={clsx({
          [colorMap.T]: colors && record.ties,
        })}
      >
        {record.ties}
      </span>
    </p>
  );
};
