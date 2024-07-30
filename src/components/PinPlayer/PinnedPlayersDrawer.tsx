import { useState, useCallback, useRef } from 'react';
import clsx from 'clsx';

import { usePinnedPlayers } from 'providers/PinnedPlayersProvider';
import { PinIcon } from 'icons/PinIcon';

import { IconButton } from 'components/Button/IconButton';

export const PinnedPlayersDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { parsedPlayers } = usePinnedPlayers();

  const handleToggleDrawer = useCallback(() => {
    setIsDrawerOpen(prevIsDrawerOpen => !prevIsDrawerOpen);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <>
      <IconButton
        icon={<PinIcon />}
        alt="View Pinned Players"
        onClick={handleToggleDrawer}
        disabled={Object.keys(parsedPlayers).length === 0}
      />

      <div
        className={clsx(
          'fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white w-96 dark:bg-gray-800 border-l border-gray-500 dark:border-gray-400',
          {
            'translate-x-full': !isDrawerOpen,
          }
        )}
        aria-labelledby="drawer-label"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
        >
          Pinned Players
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-example"
          aria-controls="drawer-example"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={handleCloseDrawer}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close pinned players</span>
        </button>

        {Object.keys(parsedPlayers).length === 0 && (
          <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400">
            No pinned players
          </div>
        )}

        {Object.keys(parsedPlayers).map(tournamentId => {
          const tournament = parsedPlayers[tournamentId];
          return (
            <div
              key={tournamentId}
              className="mb-4 pb-4 border-b border-gray-500 dark:border-gray-400"
            >
              <h6 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                {tournamentId}
              </h6>
              <ul>
                {Object.keys(tournament).map(division => {
                  const players = tournament[division];
                  return players.map((player: string) => (
                    <li key={player} className="text-gray-700 dark:text-gray-400">
                      {player} - {division}
                    </li>
                  ));
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};
