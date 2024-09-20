import { createElement } from 'react';
import clsx from 'clsx';

import { headingClasses } from './headingClasses';

import type { ReactNode } from 'react';

export type HeadingProps = {
    className?: string;
    level?: '1' | '2' | '3' | '4' | '5' | '6';
    children: ReactNode;
};

export const Heading = ({
    children,
    level = '1',
    className = '',
}: HeadingProps) => {
    return createElement(
        `h${level}`,
        {
            className: clsx({
                [className]: !!className,
                [headingClasses.base]: true,
                [headingClasses.level[level]]: true,
            }),
        },
        children
    );
};
