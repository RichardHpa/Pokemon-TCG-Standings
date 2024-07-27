import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';

export type QueryOptions<Response, TError = any, TData = Response> = Omit<
  // TQueryFnData , TError, TData, TQueryKey
  UseQueryOptions<Response, TError, TData, QueryKey>,
  'queryKey' | 'queryFn' | 'initialData'
>;
