import clsx from 'clsx';

import type { FC } from 'react';
import type { CardProps } from './types';

export const Card: FC<CardProps> = ({ growHeight = true, children }) => {
    return (
        <div
            className={clsx(
                'w-full  border bg-gray-50 shadow-sm border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg p-4',
                { 'h-full': growHeight }
            )}
        >
            {children}
        </div>
    );
};
