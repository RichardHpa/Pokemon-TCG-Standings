import { useState, useCallback, useRef } from 'react';
import clsx from 'clsx';

import { usePinnedPlayers } from 'pages/Home/components/PinnedPlayers/PinnedPlayers';
import { useLikes } from 'providers/PinnedPlayersProvider/PinnedPlayersProvider';
import { PinIcon } from 'icons/PinIcon';

import { IconButton } from 'components/Button/IconButton';

export const PinnedPlayersDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { likes } = useLikes();

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
        // disabled={Object.keys(pinnedPlayers).length === 0}
        disabled={likes.length === 0}
      />

      <div
        className={clsx(
          'fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white w-96 dark:bg-gray-800',
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
          <span className="sr-only">Close menu</span>
        </button>

        {likes.length === 0 && (
          <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400">
            No pinned players
          </div>
        )}

        {likes.map((like: any) => {
          return (
            <div
              key={like}
              className="flex items-center justify-between p-2 border-b border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-4">
                <span>{like}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
