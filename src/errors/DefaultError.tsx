import { Link } from 'react-router-dom';

import type { FC } from 'react';

interface DefaultErrorProps {
  code?: number;
  title?: string;
  message?: string;
}

export const DefaultError: FC<DefaultErrorProps> = ({
  code = 404,
  title = "Something's missing.",
  message = "Sorry, we can't find that page. You'll find lots to explore on the home page.",
}) => {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            {code}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            {title}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{message}</p>
          <Link
            to="/"
            className="inline-flex text-white bg-gray-900 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};
