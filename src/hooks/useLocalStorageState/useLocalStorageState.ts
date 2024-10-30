import { useState, useEffect } from 'react';

import { BASE_KEY } from 'constants/siteKeys';

import type { SetStateAction } from 'react';

export function useLocalStorageState<T>(
    key: string,
    initialValue: T
): [T, React.Dispatch<SetStateAction<T>>] {
    const envKey = `${BASE_KEY}:${key}:${import.meta.env.MODE}`;
    const [state, setState] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(envKey);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(envKey, JSON.stringify(state));
        } catch (error) {
            console.error(error);
        }
    }, [envKey, state]);

    return [state, setState];
}
