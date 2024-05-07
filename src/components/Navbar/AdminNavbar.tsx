import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

import { Button } from 'components/Button';

import { ColorModeSwitcher } from 'components/ColorModeSwitcher';

import type { FC } from 'react';

interface AdminNavbarProps {
  onNavToggle: () => void;
}

export const AdminNavbar: FC<AdminNavbarProps> = ({ onNavToggle }) => {
  const { signOut, user } = useAuthenticator();

  return (
    <header className="fixed w-full z-50">
      <nav className="bg-white p-4 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <button
              id="toggleSidebar"
              onClick={onNavToggle}
              aria-expanded="true"
              aria-controls="sidebar"
              className="p-2 mr-3 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                {' '}
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h14M1 6h14M1 11h7"
                />{' '}
              </svg>
            </button>

            <Link to="/" className="flex mr-4">
              <img src="/logo192.png" className="mr-3 h-8" alt="FlowBite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                PTCG Standings
              </span>
            </Link>
          </div>

          <div className="flex gap-2 items-center lg:order-2">
            <ColorModeSwitcher />

            <button
              type="button"
              data-dropdown-toggle="notification-dropdown"
              className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">View settings</span>
              <Cog6ToothIcon className="w-5 h-5" aria-hidden="true" />
            </button>

            <div
              className="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700"
              id="notification-dropdown"
            >
              <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                Settings
              </div>
              <div>
                <Link
                  to="#"
                  className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="w-11 h-11 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                      alt="Bonnie Green avatar"
                    />
                    <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700">
                      <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 18"
                      >
                        <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                        <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="pl-3 w-full">
                    <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                      New message from{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Bonnie Green
                      </span>
                      : "Hey, what's up? All set for the presentation?"
                    </div>
                    <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                      a few moments ago
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
