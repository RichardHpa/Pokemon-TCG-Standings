export const noticeClasses = {
  base: 'flex p-4 mb-4 text-sm border rounded-lg gap-2 items-start',
  status: {
    info: 'text-blue-800 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800',
    success:
      'text-green-800 border-green-300 dark:text-green-400 dark:border-green-800 bg-green-50 dark:bg-gray-800',
    error:
      'text-red-800 border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800',
    warning:
      'text-yellow-800 border-yellow-300 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800',
    dark: 'text-gray-800 border-gray-300 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600',
  },
  dismissible: {
    base: 'ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex justify-center h-8 w-8 dark:bg-gray-800',
    info: 'bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:text-blue-400 dark:hover:bg-gray-700',
    error:
      'bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:text-red-400 dark:hover:bg-gray-700',
    success:
      'bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:text-green-400 dark:hover:bg-gray-700',
    warning:
      'bg-yellow-50 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:text-yellow-300 dark:hover:bg-gray-700',
    dark: 'bg-gray-50 text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
  },
};
