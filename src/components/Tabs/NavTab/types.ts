import type { ReactNode } from 'react';

export interface NavTab {
  children: ReactNode;
  to: string;
  active?: boolean;
}
