import { useContext } from 'react';

import { FetchingContext } from './FetchingContext';

export const useFetching = () => useContext(FetchingContext);
