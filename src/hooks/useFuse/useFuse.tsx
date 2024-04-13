import Fuse from 'fuse.js';
import { useCallback, useMemo, useState } from 'react';
import lodashDebounce from 'lodash/debounce';

import type { IFuseOptions } from 'fuse.js';

const debounceTime = 400;
export function useFuse<T>(list: T[], options: IFuseOptions<T>): any {
  const [query, updateQuery] = useState('');

  // let's memoize the fuse instance for performances
  const fuse = useMemo(() => new Fuse(list, options), [list, options]);

  const hits = useMemo(() => {
    if (!query) {
      return list;
    }

    const results = fuse.search(query);
    return results.map(result => result.item);
  }, [fuse, list, query]);

  // debounce updateQuery and rename it `setQuery` so it's transparent
  const setQuery = lodashDebounce(updateQuery, debounceTime);

  // pass a handling helper to speed up implementation
  const onSearch = useCallback((e: string) => setQuery(e), [setQuery]);

  return {
    hits,
    onSearch,
    query,
    searching: query.length > 0,
  };
}
