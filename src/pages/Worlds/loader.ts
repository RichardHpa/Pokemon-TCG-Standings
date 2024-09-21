import { countryList } from 'mocks/tempData/0000128';

import type { LoaderFunctionArgs } from 'react-router-dom';
import type { TCountryCode } from 'countries-list';

export const worldsLoader = ({ params }: LoaderFunctionArgs) => {
    const { country } = params as { country: string };

    if (!country) {
        throw new Error('Country not found');
    }
    const upper = country.toUpperCase() as TCountryCode;

    if (!countryList.includes(upper)) {
        throw new Error('Country not found');
    }

    return {
        country: upper,
    };
};
