import type { FC } from 'react';
import type { Tabs as TabsType } from './types';

export const Tabs: FC<TabsType> = ({ children }) => {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {children}
    </ul>
  );
};
