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
}) => {
  const RenderedIcon = cloneElement(icon, {
    className: iconButtonClasses.icon,
  });

  return (
    <button
      type="button"
      className={clsx(
        iconButtonClasses.base,
        buttonClasses.variant[variant].base,
        buttonClasses.variant[variant][color].light,
        buttonClasses.variant[variant][color].dark,
        { [buttonClasses.disabled]: disabled }
      )}
    >
      {RenderedIcon}
      <span className="sr-only">{alt}</span>
    </button>
  );
};
