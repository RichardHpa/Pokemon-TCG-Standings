import clsx from 'clsx';

export const withColorModeDecorator = (Story: any, context: any) => {
  const theme = context.globals.theme;
  return (
    <div
      className={clsx({
        dark: theme === 'dark',
        light: theme === 'light',
      })}
    >
      <div className="min-h-screen p-4 bg-white dark:bg-gray-900 text-black dark:text-gray-200">
        <Story />
      </div>
    </div>
  );
};
