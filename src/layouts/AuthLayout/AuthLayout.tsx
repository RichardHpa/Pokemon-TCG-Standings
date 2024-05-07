import { clsx } from 'clsx';
import { useState, useCallback } from 'react';
import { Outlet, Link, useMatches } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';

import { AdminNavbar } from 'components/Navbar/AdminNavbar';

import '@aws-amplify/ui-react/styles.css';

const SidebarStates = {
  open: 'open',
  closed: 'closed',
  hover: 'hover',
};

type SidebarState = (typeof SidebarStates)[keyof typeof SidebarStates];

const subMenuItems = [
  { name: 'Settings', to: 'settings' },
  { name: 'Kanban', to: 'kanban' },
  { name: 'Calendar', to: 'calendar' },
];

const PageDropdown = ({ sidebarShouldBeOpen }: { sidebarShouldBeOpen: boolean }) => {
  const matches = useMatches();
  const isCurrentPage = matches.some(match =>
    subMenuItems.some(item => match.pathname.includes(item.to))
  );

  return (
    <li>
      <button
        type="button"
        className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        aria-controls="dropdown-pages"
        data-collapse-toggle="dropdown-pages"
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
        {sidebarShouldBeOpen && (
          <span className="flex-1 ml-3 text-left whitespace-nowrap">Pages</span>
        )}

        <svg
          aria-hidden="true"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      <ul id="dropdown-pages" className={clsx('py-2 space-y-2', !isCurrentPage && 'hidden')}>
        {subMenuItems.map(item => {
          return (
            <li key={item.name}>
              <Link
                to={`/dashboard/pages/${item.to}`}
                className={clsx(
                  'flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
                  sidebarShouldBeOpen && 'pl-11',
                  !sidebarShouldBeOpen && 'justify-center'
                )}
              >
                {sidebarShouldBeOpen ? item.name : item.name[0]}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export const AuthLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<SidebarState>(SidebarStates.open);

  const handleNavToggle = useCallback(() => {
    if (isSidebarOpen === SidebarStates.open) {
      setIsSidebarOpen(SidebarStates.closed);
    } else {
      setIsSidebarOpen(SidebarStates.open);
    }
  }, [isSidebarOpen]);

  const handleSidebarMouseEnter = useCallback(() => {
    if (isSidebarOpen === SidebarStates.open) return;

    setIsSidebarOpen(SidebarStates.hover);
  }, [isSidebarOpen]);

  const handleSidebarMouseLeave = useCallback(() => {
    if (isSidebarOpen === SidebarStates.open) return;
    setIsSidebarOpen(SidebarStates.closed);
  }, [isSidebarOpen]);

  const sidebarShouldBeOpen =
    isSidebarOpen === SidebarStates.open || isSidebarOpen === SidebarStates.hover;

  return (
    <Authenticator variation="modal" hideSignUp>
      {({ signOut, user }) => (
        <>
          <AdminNavbar onNavToggle={handleNavToggle} />

          <div className="mt-16 overflow-hidden flex">
            <aside
              id="default-sidebar"
              className={clsx(
                'fixed top-0 left-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0 pt-16',
                sidebarShouldBeOpen ? 'w-64' : 'w-16',
                isSidebarOpen === SidebarStates.closed ? '-translate-x-full' : ''
              )}
              aria-label="Sidenav"
              onMouseOver={handleSidebarMouseEnter}
              onMouseLeave={handleSidebarMouseLeave}
            >
              <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col">
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                      </svg>
                      {sidebarShouldBeOpen && <span className="ml-3">Overview</span>}
                    </Link>
                  </li>

                  <PageDropdown sidebarShouldBeOpen={sidebarShouldBeOpen} />
                </ul>
                {user?.signInDetails?.loginId && (
                  <div className="mt-auto">
                    {sidebarShouldBeOpen ? (
                      user?.signInDetails?.loginId
                    ) : (
                      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mt-auto">
                        <span className="font-medium text-gray-600 dark:text-gray-300">
                          {user?.signInDetails?.loginId[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </aside>

            <div
              className={clsx(
                'w-full overflow-y-auto h-full p-4',
                isSidebarOpen === SidebarStates.closed ? 'ml-16' : 'ml-64'
              )}
            >
              <Outlet />
            </div>
          </div>
        </>
      )}
    </Authenticator>
  );
};
