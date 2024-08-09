import { CountryList } from './components/CountryList';

export const Worlds = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <p className="text-center">
        Follow TCG players from around the world as they complete to be the 2024 Pokemon World
        Champions.
      </p>

      <CountryList />

      <p className="mb-1 italic text-gray-500 dark:text-gray-400 text-center">
        Current Standings will be shown once the tournament starts.
      </p>
    </div>
  );
};
