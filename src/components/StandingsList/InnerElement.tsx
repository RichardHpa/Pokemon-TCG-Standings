import { forwardRef } from 'react';

import type { ListChildComponentProps } from 'react-window';

export const InnerElement = forwardRef(({ ...rest }: ListChildComponentProps, ref) => {
  // @ts-expect-error
  return <ul ref={ref} {...rest} className="divide-y divide-gray-200 dark:divide-gray-700" />;
});
