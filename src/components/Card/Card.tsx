import type { FC } from 'react';
import type { CardProps } from './types';

export const Card: FC<CardProps> = ({ children }) => {
  return (
    <div className="w-full h-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      {children}
    </div>
  );
};
