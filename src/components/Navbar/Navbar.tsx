import clsx from 'clsx';
import { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/Button';

import { useResponsive } from 'hooks/useResponsive';
import { useAnalytics } from 'hooks/useAnalytics';

import { LoadingPokeball } from 'components/LoadingPokeball';

import { NavLink } from 'components/NavLink';

import { BuyMeACoffeeWidget } from 'components/BuyMeACoffeeWidget';
import { ColorModeSwitcher } from 'components/ColorModeSwitcher';
import { PinnedPlayersDrawer } from 'components/PinPlayer';

export const Navbar = () => {
    const { sendEvent } = useAnalytics();
    const { md } = useResponsive();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleToggleNavbar = useCallback(() => {
        setIsNavbarOpen((prevIsNavbarOpen) => !prevIsNavbarOpen);
    }, []);

    const handleCloseNavbar = useCallback(() => {
        setIsNavbarOpen(false);
    }, []);

    const handleOnBetaClick = useCallback(() => {
        sendEvent({
            category: 'Beta Link',
            action: 'click',
            label: 'Clicked on Beta Link',
        });

        window.open('https://ptcg-standings.fly.dev/', '_blank');
    }, [sendEvent]);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between md:justify-center lg:justify-between mx-auto p-4">
                <Link
                    to="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse hover:underline"
                >
                    <LoadingPokeball
                        animate={false}
                        opened={false}
                        size={40}
                        alt="PTCG Standings"
                        caught={false}
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        PTCG Standings
                    </span>
                </Link>

                <div className="md:hidden flex gap-2">
                    {!md && <PinnedPlayersDrawer />}

                    <button
                        ref={buttonRef}
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                        onClick={handleToggleNavbar}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>

                <div
                    className={clsx('w-full md:block md:w-auto', {
                        hidden: !isNavbarOpen,
                    })}
                    id="navbar-default"
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row gap-4 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center">
                        <li className="w-full md:w-auto">
                            <Button size="sm" full onClick={handleOnBetaClick}>
                                View V2 Beta
                            </Button>
                        </li>
                        <li className="w-full md:w-auto">
                            <Link to="worlds-2024" onClick={handleCloseNavbar}>
                                <Button size="sm" full>
                                    Worlds 2024
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <NavLink to="about" onClick={handleCloseNavbar}>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="tournaments"
                                onClick={handleCloseNavbar}
                            >
                                Tournaments
                            </NavLink>
                        </li>
                        <li>
                            <BuyMeACoffeeWidget />
                        </li>
                        <li>
                            <ColorModeSwitcher />
                        </li>
                        {md && (
                            <li>
                                <PinnedPlayersDrawer />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
