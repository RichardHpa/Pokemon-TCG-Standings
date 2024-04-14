import clsx from 'clsx';

import { buttonClasses } from './classes';

import type { FC } from 'react';
import type { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({
  color = 'primary',
  variant = 'solid',
  size = 'base',
  disabled = false,
  full = false,
  children,
  className,
  ...rest
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={clsx(
        buttonClasses.base,
        buttonClasses.size[size],
        buttonClasses.variant[variant].base,
        buttonClasses.variant[variant][color].light,
        buttonClasses.variant[variant][color].dark,
        { [buttonClasses.disabled]: disabled },
        { [buttonClasses.full]: full },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
