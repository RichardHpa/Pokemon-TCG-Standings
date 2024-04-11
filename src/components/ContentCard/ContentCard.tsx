import type { FC, ReactNode } from 'react';

interface ContentCardProps {
  children: ReactNode;
  title: string;
  action?: ReactNode;
}

export const ContentCard: FC<ContentCardProps> = ({ children, title, action }) => {
  return (
    <div className="rounded-xl dark:text-gray-400 border border-gray-100 dark:border-gray-700 dark:hover:border-gray-600 hover:shadow-lg dark:hover:shadow-lg-light bg-white dark:bg-gray-900   h-full flex flex-col">
      <div className="flex justify-between bg-gray-50 dark:bg-gray-700 rounded-t-lg py-2.5 px-3 items-center border-b border-gray-200 dark:border-gray-700">
        <h2>{title}</h2>
        {action && <div className="flex gap-2">{action}</div>}
      </div>

      {children}
    </div>
  );
};
