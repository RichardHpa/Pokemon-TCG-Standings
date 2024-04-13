import type { FC } from 'react';
import type { CardProps } from './types';

export const Card: FC<CardProps> = ({ children }) => {
  return (
    <div className="w-full h-full border bg-gray-50 shadow-sm border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg p-4">
      {children}
    </div>
  );
};

// border bg-gray-50 shadow-sm border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg p-4

// flex flex-col sm:flex-row items-center justify-between
