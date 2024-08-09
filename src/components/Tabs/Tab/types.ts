import { ReactNode } from 'react';

export interface TabProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}
