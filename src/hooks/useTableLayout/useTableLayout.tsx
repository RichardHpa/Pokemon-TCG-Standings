import { useState } from 'react';

import { tableLayoutKey } from 'constants/siteKeys';

// import { TableCellsIcon, QueueListIcon } from '@heroicons/react/24/solid';

// import { IconButton } from 'components/Button/IconButton';

export enum TableLayout {
  GRID = 'grid',
  LIST = 'list',
}

const getTableLayout = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const tableLayout = window.localStorage.getItem(tableLayoutKey);
    if (tableLayout) {
      return tableLayout as TableLayout;
    }
  }

  return TableLayout.GRID;
};

export const useTableLayout = () => {
  const [tableLayout, setTableLayout] = useState<TableLayout>(() => {
    return getTableLayout();
  });

  const toggleTableLayout = () => {
    const newValue = tableLayout === TableLayout.GRID ? TableLayout.LIST : TableLayout.GRID;
    setTableLayout(newValue);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(tableLayoutKey, newValue);
    }
  };

  return { tableLayout, toggleTableLayout, TableLayout };
};
