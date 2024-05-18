import clsx from 'clsx';
import { listItemClasses } from './classes';

import type { ListItemProps } from './types';
import type { FC } from 'react';

export const ListItem: FC<ListItemProps> = ({ children, hover = false, actions }) => {
  return (
    <li className={clsx(listItemClasses.base, hover && listItemClasses.hover)}>
      <div className="flex justify-between items-center">
        {children}
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </li>
  );
};
