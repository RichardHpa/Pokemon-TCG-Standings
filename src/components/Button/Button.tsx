import { useCallback } from 'react';

import clsx from 'clsx';

import { buttonClasses } from './classes';

import type { FC, MouseEvent } from 'react';
import type { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({
    color = 'primary',
    variant = 'solid',
    size = 'base',
    disabled = false,
    full = false,
    children,
    className,
    onClick,
    ...rest
}) => {
    const handleOnClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            event.currentTarget.blur();
            if (onClick) {
                onClick(event);
            }
        },
        [onClick]
    );
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
            onClick={handleOnClick}
        >
            {children}
        </button>
    );
};
