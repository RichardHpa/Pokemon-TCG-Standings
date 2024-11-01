import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { ContentCard } from 'components/ContentCard';
import { Indicator } from 'components/Indicator';
import { DecideLogo } from 'components/DecideLogo';

import { RUNNING, NOT_STARTED, CHECK_IN } from 'constants/tournament';
import { formatDateFromTimezone } from 'helpers/formatDateFromTimezone';

import { getCountryFlag } from 'helpers/getCountryFlag';
import { getCountryCode } from 'utils/getCountryCode';
import { removeCountryFromName } from 'utils/removeCountryFromName';

import { tournaments } from 'constants/tournaments';

import type { TournamentsCardProps } from './types';
import type { FC } from 'react';
import type { Tournament } from 'types/tournament';

const upcomming = [NOT_STARTED, CHECK_IN];

const TournamentCardInner = ({ tournament }: { tournament: Tournament }) => {
    return (
        <div className="flex justify-between py-6 gap-8 flex-col md:flex-row">
            <div className="flex gap-4">
                {tournaments[tournament.id]?.logo ? (
                    <img
                        src={tournaments[tournament.id].logo}
                        alt={tournament.name}
                        className="w-16 h-fit"
                    />
                ) : (
                    <DecideLogo tournamentName={tournament.name} />
                )}
                <div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {tournament.name}
                    </div>
                    {tournament.winners.masters && (
                        <div>
                            Masters winner:{' '}
                            {removeCountryFromName(tournament.winners.masters)}{' '}
                            {getCountryFlag(
                                getCountryCode(tournament.winners.masters)
                            )}
                        </div>
                    )}

                    {tournament.winners.seniors && (
                        <div>
                            Seniors winner:{' '}
                            {removeCountryFromName(tournament.winners.seniors)}{' '}
                            {getCountryFlag(
                                getCountryCode(tournament.winners.seniors)
                            )}
                        </div>
                    )}

                    {tournament.winners.juniors && (
                        <div>
                            Juniors winner:{' '}
                            {removeCountryFromName(tournament.winners.juniors)}{' '}
                            {getCountryFlag(
                                getCountryCode(tournament.winners.juniors)
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDateFromTimezone(
                        tournament.date.start,
                        'MMMM d, yyyy'
                    )}{' '}
                    -{' '}
                    {formatDateFromTimezone(
                        tournament.date.end,
                        'MMMM d, yyyy'
                    )}
                </div>

                {tournament.tournamentStatus === RUNNING && <Indicator />}
            </div>
        </div>
    );
};

export const TournamentsCard: FC<TournamentsCardProps> = ({
    title,
    tournaments,
}) => {
    return (
        <ContentCard title={title}>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {tournaments.map((tournament) => {
                    return (
                        <li
                            key={tournament.id}
                            className={clsx(
                                'w-full items-center pl-3 pr-6 text-gray-700 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400',
                                {
                                    'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900':
                                        !upcomming.includes(
                                            tournament.tournamentStatus
                                        ),
                                }
                            )}
                        >
                            {!upcomming.includes(
                                tournament.tournamentStatus
                            ) ? (
                                <Link to={`/tournaments/${tournament.id}`}>
                                    <TournamentCardInner
                                        tournament={tournament}
                                    />
                                </Link>
                            ) : (
                                <TournamentCardInner tournament={tournament} />
                            )}
                        </li>
                    );
                })}
            </ul>
        </ContentCard>
    );
};
