export const textFieldClasses = {
  label: {
    base: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
    validation: {
      base: 'block mb-2 text-sm font-medium', // text-red-700 dark:text-red-500
      error: 'text-red-700 dark:text-red-500',
    },
  },
  input: {
    base: 'border text-sm rounded-lg  block w-full p-2.5',
    validation: {
      base: 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
      error:
        'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',
    },
    readOnly:
      'bg-gray-100 dark:bg-gray-800 focus:ring-0 focus:border-gray-300 dark:focus:border-gray-600 dark:text-gray-500 dark:placeholder-gray-400 cursor-default dark:border-gray-600 dark:focus:ring-0',
  },
};
