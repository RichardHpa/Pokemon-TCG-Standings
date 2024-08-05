import type { ReactNode, ComponentPropsWithoutRef } from 'react';

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'grey';
  variant?: 'solid' | 'outlined' | 'text';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  disabled?: boolean;
  full?: boolean;
} & ComponentPropsWithoutRef<'button'>;
