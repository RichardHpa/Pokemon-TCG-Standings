import { useMemo } from 'react';
import { useGetSimilarPlayers } from 'hooks/useGetSimilarPlayers';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

import type { Standing } from 'types/standing';
import type { FC, ReactNode } from 'react';

export interface ResistancesListItemProps {
  state: 'above' | 'below';
  player: Standing;
}

export interface SimilarPointsProps {
  player: Standing;
  data: Standing[];
  totalPoints: number;
}

const ListItemClasses = {
  base: 'flex justify-between items-center pl-3 pr-6 py-2 text-gray-700 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400',
  active: 'bg-gray-50 dark:bg-gray-700 font-bold',
};

interface ListItemProps {
  children: ReactNode;
  active?: boolean;
}

const ListItem: FC<ListItemProps> = ({ children, active }) => {
  return (
    <li
      className={clsx({
        [ListItemClasses.base]: true,
        [ListItemClasses.active]: active,
      })}
    >
      {children}
    </li>
  );
};

const ResistancesListItem: FC<ResistancesListItemProps> = ({ state, player }) => {
  return (
    <ListItem>
      <div className="w-full flex flex-col gap-1">
        <div className="flex justify-between">
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {player.record.wins}-{player.record.losses}-{player.record.ties}
          </p>
          <div className="flex gap-1">
            {state === 'above' ? <ChevronUpIcon className="h-5 w-5 text-red-500" /> : null}
            {state === 'below' ? <ChevronDownIcon className="h-5 w-5 text-blue-500" /> : null}
            <p
              className={clsx({
                'text-sm text-gray-500 truncate dark:text-gray-400"': true,
                'text-red-500': state === 'above',
                'text-blue-500': state === 'below',
              })}
            >
              {player.resistances.opp}
            </p>
          </div>
        </div>
        <p>{player.name}</p>
      </div>
    </ListItem>
  );
};

export const SimilarPointsList: FC<SimilarPointsProps> = ({ player, data, totalPoints }) => {
  const players = useGetSimilarPlayers(player.placing - 1, data);

  const playerCount = useMemo(() => {
    if (!players) return 0;
    return players.above.length + players.below.length + 1;
  }, [players]);

  const renderAbove = useMemo(() => {
    if (!players?.above) return null;
    const length = players?.above.length;
    if (length > 4) {
      return (
        <>
          <ResistancesListItem state="above" player={players.above[0]} />
          <ResistancesListItem state="above" player={players.above[1]} />

          <ListItem>
            <i>...{length - 4} other players</i>
          </ListItem>

          <ResistancesListItem state="above" player={players.above[length - 2]} />
          <ResistancesListItem state="above" player={players.above[length - 1]} />
        </>
      );
    }

    return players?.above?.map(otherPlayer => {
      return <ResistancesListItem state="above" player={otherPlayer} key={otherPlayer.name} />;
    });
  }, [players?.above]);

  const renderBelow = useMemo(() => {
    if (!players?.below) return null;
    const length = players?.below.length;

    if (length > 4) {
      return (
        <>
          <ResistancesListItem state="below" player={players.below[0]} />
          <ResistancesListItem state="below" player={players.below[1]} />

          <ListItem>
            <i>...{length - 4} other players</i>
          </ListItem>

          <ResistancesListItem state="below" player={players.below[length - 2]} />
          <ResistancesListItem state="below" player={players.below[length - 1]} />
        </>
      );
    }

    return players?.below?.map(otherPlayer => {
      return <ResistancesListItem state="below" player={otherPlayer} key={otherPlayer.name} />;
    });
  }, [players?.below]);

  if (Object.keys(player.rounds).length <= 3) {
    return (
      <div className="py-2.5 px-3">
        <p className="my-3 font-semibold leading-tight text-gray-800 dark:text-gray-400 text-sm">
          Player comparisons will be available after round 3 as there would be to many players to
          compare
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="py-2.5 px-3">
        <p className="my-3 font-semibold leading-tight text-gray-800 dark:text-gray-400 text-sm">
          There are {playerCount} players with also {totalPoints} Points
        </p>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {renderAbove}

        <ListItem active>
          <p>Your Placement</p>
          <p>{player.resistances.opp}</p>
        </ListItem>

        {renderBelow}
      </ul>
    </>
  );
};
