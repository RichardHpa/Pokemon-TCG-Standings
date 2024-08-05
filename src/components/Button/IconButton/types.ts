import type { ButtonProps } from '../types';
import type { ReactElement } from 'react';

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'full'> {
  icon: ReactElement;
  alt: string;
  rounded?: boolean;
}
