import { UserGroupIcon } from '@heroicons/react/24/solid';

export const PinnedPlayersDrawer = () => {
  return (
    <>
      <button
        type="button"
        className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white  dark:hover:bg-blue-500"
      >
        <UserGroupIcon className="h-6 w-6 inline-block" />
      </button>
    </>
  );
};
