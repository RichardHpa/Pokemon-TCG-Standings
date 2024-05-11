import type { ListProps } from './types';
import type { FC } from 'react';

export const List: FC<ListProps> = ({ children }) => {
  return <ul className="divide-y divide-gray-200 dark:divide-gray-700">{children}</ul>;
};
