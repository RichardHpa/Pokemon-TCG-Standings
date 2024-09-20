import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import type { FC } from 'react';
import type { NavTab as NavTabProps } from './types';

export const NavTab: FC<NavTabProps> = ({ to, children, active }) => {
    return (
        <li className="me-2">
            <NavLink
                to={to}
                className={({ isActive }) =>
                    clsx(
                        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300',
                        {
                            'text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500 cursor-default hover:text-blue-600 dark:hover:text-blue-500':
                                isActive || active,
                        }
                    )
                }
            >
                {children}
            </NavLink>
        </li>
    );
};
