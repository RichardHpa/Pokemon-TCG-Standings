import { forwardRef } from 'react';

import type { ListChildComponentProps } from 'react-window';

export const InnerElement = forwardRef<HTMLUListElement, ListChildComponentProps>((props, ref) => {
  return <ul ref={ref} {...props} className="divide-y divide-gray-200 dark:divide-gray-700" />;
});
