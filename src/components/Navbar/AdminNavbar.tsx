import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

import { ColorModeSwitcher } from 'components/ColorModeSwitcher';

import type { FC } from 'react';

interface AdminNavbarProps {
  onNavToggle: () => void;
}

export const AdminNavbar: FC<AdminNavbarProps> = ({ onNavToggle }) => {
  const { user, signOut } = useAuthenticator();

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
              className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 flex-shrink-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="userMenuDropdownButton"
              aria-expanded="false"
              data-dropdown-toggle="userMenuDropdown"
            >
              <span className="sr-only">View settings</span>
              <Cog6ToothIcon className="w-5 h-5" aria-hidden="true" />
            </button>

            <div
              className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              id="userMenuDropdown"
            >
              <div className="py-3 px-4">
                <span className="block text-sm font-light text-gray-500 truncate dark:text-gray-400">
                  {user?.signInDetails?.loginId}
                </span>
              </div>

              <ul
                className="py-1 font-light text-gray-500 dark:text-gray-400"
                aria-labelledby="dropdown"
              >
                <li>
                  <button
                    onClick={signOut}
                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
