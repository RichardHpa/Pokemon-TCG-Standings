// font-medium text-sm text-center inline-flex items-center p-2.5 border

// font-medium text-sm text-center inline-flex items-center p-2 border text-gray-900 hover:text-white hover:bg-gray-900 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 rounded-full

export const iconButtonClasses = {
  base: 'font-medium text-sm text-center inline-flex items-center',
  icon: {
    base: 'inline-flex',
    size: {
      xs: 'h-4 w-4',
      sm: 'h-4 w-4',
      base: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-6 w-6',
    },
  },
  rounded: {
    true: 'rounded-full',
    false: 'rounded-lg',
  },
  size: {
    xs: 'p-2',
    sm: 'p-2.5',
    base: 'p-2.5',
    lg: 'p-3',
    xl: 'p-3.5',
  },
};
