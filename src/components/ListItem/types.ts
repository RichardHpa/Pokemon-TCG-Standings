import { ReactNode } from 'react';

export interface ListItemProps {
  children: ReactNode;
  hover?: boolean;
  actions?: ReactNode;
}
