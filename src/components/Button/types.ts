import type { ReactNode, ComponentPropsWithoutRef } from 'react';

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'error';
  variant?: 'solid' | 'outlined';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  disabled?: boolean;
  full?: boolean;
} & ComponentPropsWithoutRef<'button'>;
