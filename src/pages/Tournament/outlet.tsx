import { Fragment } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';

import { Heading } from 'components/Heading';
import { Indicator } from 'components/Indicator';
import { LoadingPokeball } from 'components/LoadingPokeball';
import { Notice } from 'components/Notice';
import { DivisionTabs } from 'components/DivisionTabs';
import { DecideLogo } from 'components/DecideLogo';

import { RUNNING, FINISHED } from 'constants/tournament';
import { tournaments } from 'constants/tournaments';

import { useGetTournament } from 'queries/useGetTournament';

import { formatDateFromTimezone } from 'helpers/formatDateFromTimezone';

const showStandings = [RUNNING, FINISHED];

export const TournamentOutlet = () => {
    const { tournamentId, playerName } = useParams() as {
        tournamentId: string;
        playerName?: string;
    };

    const {
        data: tournament,
        isPending,
        isError,
    } = useGetTournament({
        tournamentId,
        select: (data) => data.tournament,
    });

    if (isPending) {
        return (
            <div className="flex flex-col justify-center items-center">
                <LoadingPokeball
                    size="100"
                    alt="Loading tournament info...</p>"
                />
            </div>
        );
    }

    if (isError) {
        return (
            <Notice status="error">
                Error loading your tournaments, please try again later
            </Notice>
        );
    }

    const streams = tournaments[tournamentId]?.streams;
    const streamKeys = Object.keys(streams || {});

    return (
        <div className="flex flex-col gap-4 flex-grow">
            <div className="flex justify-between mb-4">
                <div className="grid sm:grid-cols-[auto_auto] place-content-start gap-4">
                    <div className="hidden sm:block">
                        {tournaments[tournamentId]?.logo ? (
                            <img
                                src={tournaments[tournamentId].logo}
                                alt={tournament.name}
                                className="h-0 min-h-full object-contain"
                            />
                        ) : (
                            <DecideLogo tournamentName={tournament.name} />
                        )}
                    </div>

                    <div>
                        <Link to={`/tournaments/${tournamentId}`}>
                            <Heading
                                level="3"
                                className="hover:underline cursor-pointer"
                            >
                                {tournament.name}
                            </Heading>
                        </Link>

                        <p className="text-gray-500 dark:text-gray-400">
                            {formatDateFromTimezone(
                                tournament.date.start,
                                'MMMM d, yyyy'
                            )}{' '}
                            -{' '}
                            {formatDateFromTimezone(
                                tournament.date.end,
                                'MMMM d, yyyy'
                            )}
                        </p>

                        {streams && (
                            <div className="flex gap-2">
                                <p className="text-gray-500 dark:text-gray-400">
                                    Streams:{' '}
                                </p>
                                {Object.entries(streams).map(
                                    ([day, url], index) => {
                                        return (
                                            <Fragment key={index}>
                                                <a
                                                    key={`${tournamentId}-${day}`}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 dark:text-blue-400 hover:underline"
                                                >
                                                    Day {index + 1}
                                                </a>
                                                {index <
                                                    streamKeys.length - 1 && (
                                                    <span className="text-gray-500 dark:text-gray-400">
                                                        |
                                                    </span>
                                                )}
                                            </Fragment>
                                        );
                                    }
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {tournament.tournamentStatus === RUNNING && <Indicator />}
            </div>

            {tournaments[tournamentId]?.notes && (
                <Notice>{tournaments[tournamentId].notes}</Notice>
            )}

            {!showStandings.includes(tournament.tournamentStatus) ? (
                <>
                    <Heading level="4">Tournament has not started yet</Heading>
                    <p className="text-gray-500 dark:text-gray-400">
                        More information will be provided once the first round
                        standings have been released.
                    </p>
                </>
            ) : (
                <div className="flex-grow flex flex-col gap-4">
                    {!playerName && (
                        <DivisionTabs
                            tournamentId={tournamentId}
                            divisionsObject={tournament.players}
                        />
                    )}

                    <Outlet />
                </div>
            )}
        </div>
    );
};
