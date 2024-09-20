import clsx from 'clsx';

import type { FC } from 'react';
import type { TabProps } from './types';

export const Tab: FC<TabProps> = ({ children, active, onClick }) => {
    return (
        <li
            onClick={onClick}
            className={clsx(
                'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 me-2 cursor-pointer',
                {
                    'text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500 cursor-default hover:text-blue-600 dark:hover:text-blue-500 cur':
                        active,
                }
            )}
        >
            {children}
        </li>
    );
};
