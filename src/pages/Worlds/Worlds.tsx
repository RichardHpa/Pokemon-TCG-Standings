import { CountryList } from './components/CountryList';

export const Worlds = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <p className="text-center">
        Follow TCG players from around the world as they complete to be the 2024 Pokemon World
        Champions.
      </p>

      <CountryList />
    </div>
  );
};
