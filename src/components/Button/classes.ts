export const buttonClasses = {
    base: 'font-medium rounded-lg text-center',
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
    full: 'w-full',
    variant: {
        solid: {
            base: 'border',
            primary: {
                light: 'text-white bg-blue-700 hover:bg-blue-800  border-blue-700',
                dark: 'dark:bg-blue-600 dark:hover:bg-blue-700  dark:border-blue-600',
            },
            secondary: {
                light: 'text-gray-900 hover:text-blue-700 bg-white hover:bg-gray-100 border-gray-200  border-white',
                dark: 'dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-600 dark:border-gray-600 dark:border-gray-800',
            },
            grey: {
                light: '',
                dark: '',
            },
        },
        outlined: {
            base: 'border',
            primary: {
                light: 'text-blue-700 hover:text-white border-blue-700 hover:bg-blue-800 focus:ring-blue-300',
                dark: 'dark:text-blue-500 dark:hover:text-white  dark:border-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800',
            },
            secondary: {
                light: 'text-gray-900 hover:text-white hover:bg-gray-900 focus:ring-gray-300 dark:border-gray-600',
                dark: 'dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800',
            },
            grey: {
                light: '',
                dark: '',
            },
        },
        text: {
            base: 'border border-transparent',
            primary: {
                light: 'text-blue-700 hover:text-white focus:ring-blue-300',
                dark: 'dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800',
            },
            secondary: {
                light: 'text-gray-900 hover:text-white focus:ring-gray-300',
                dark: 'dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-800',
            },
            grey: {
                light: 'text-gray-500  hover:bg-gray-100 ',
                dark: 'dark:text-gray-400 dark:hover:bg-gray-700',
            },
        },
    },
    size: {
        xs: 'px-3 py-2 text-xs',
        sm: 'px-3 py-2 text-sm',
        base: 'px-5 py-2.5 text-sm',
        lg: 'px-5 py-3 text-base',
        xl: 'px-6 py-3.5 text-base',
    },
};
