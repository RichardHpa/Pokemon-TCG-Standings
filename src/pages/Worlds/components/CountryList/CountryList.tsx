import { Link } from 'react-router-dom';

import { getCountryFlag } from 'helpers/getCountryFlag';

import { countryList } from 'mocks/tempData/0000128';

import type { TCountryCode } from 'countries-list';

export const CountryList = () => {
    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {countryList.map((country: TCountryCode) => {
                return (
                    <Link key={country} to={`/worlds-2024/${country}`}>
                        <div className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 hover:dark:bg-gray-500">
                            {getCountryFlag(country)} {country}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};
