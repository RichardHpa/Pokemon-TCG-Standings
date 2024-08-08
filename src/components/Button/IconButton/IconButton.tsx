import { cloneElement } from 'react';
import clsx from 'clsx';

import { buttonClasses } from '../classes';
import { iconButtonClasses } from './iconButtonClasses';

import type { IconButtonProps } from './types';
import type { FC } from 'react';

export const IconButton: FC<IconButtonProps> = ({
  icon,
  alt,
  color = 'primary',
  variant = 'outlined',
  disabled = false,
  rounded = true,
  size = 'base',
  ...props
}) => {
  const RenderedIcon = cloneElement(icon, {
    className: clsx(iconButtonClasses.icon.base, iconButtonClasses.icon.size[size]),
  });

  return (
    <button
      type="button"
      className={clsx(
        iconButtonClasses.base,
        iconButtonClasses.size[size],
        buttonClasses.variant[variant].base,
        buttonClasses.variant[variant][color].light,
        buttonClasses.variant[variant][color].dark,
        { [buttonClasses.disabled]: disabled },
        {
          [iconButtonClasses.rounded.true]: rounded,
          [iconButtonClasses.rounded.false]: !rounded,
        }
      )}
      disabled={disabled}
      {...props}
    >
      {RenderedIcon}
      <span className="sr-only">{alt}</span>
    </button>
  );
};
