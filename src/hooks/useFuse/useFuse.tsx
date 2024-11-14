import Fuse from 'fuse.js';
import { useCallback, useMemo, useState } from 'react';

import type { IFuseOptions } from 'fuse.js';

export function useFuse<T>(list: T[], options: IFuseOptions<T>): unknown {
    const [query, updateQuery] = useState('');

    const reset = useCallback(() => {
        updateQuery('');
    }, []);

    // let's memoize the fuse instance for performances
    const fuse = useMemo(() => new Fuse(list, options), [list, options]);

    const hits = useMemo(() => {
        if (!query) {
            return list;
        }

        const results = fuse.search(query);
        return results.map((result) => result.item);
    }, [fuse, list, query]);

    // pass a handling helper to speed up implementation
    const onSearch = useCallback((e: string) => {
        updateQuery(e);
    }, []);

    return {
        hits,
        onSearch,
        query,
        searching: query.length > 0,
        reset,
    };
}
