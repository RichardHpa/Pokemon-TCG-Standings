import { useMemo, useState, useEffect, useCallback } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
    ArrowRightIcon,
    TableCellsIcon,
    QueueListIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { getCountryData } from 'countries-list';
import { getCountryFlag } from 'helpers/getCountryFlag';

import { RunningPersonIcon } from 'icons/RunningPerson';
import { createPlayerUrl } from 'utils/createPlayerUrl';
import { useTableLayout, TableLayout } from 'hooks/useTableLayout';

import { Heading } from 'components/Heading';
import { LoadingPokeball } from 'components/LoadingPokeball';
import { Card } from 'components/Card';
import { PlayerRecord } from 'components/PlayerRecord';
import { RoundRow } from 'components/RoundsTable';
import { IconButton } from 'components/Button/IconButton';
import { FINISHED } from 'constants/tournament';
import { StandingsList } from 'components/StandingsList';
import { Tabs, Tab } from 'components/Tabs';
import { SEO } from 'components/SEO';

import { CountryList } from './components/CountryList';

import { uppercaseFirstLetter } from 'utils/uppercaseFirstLetter';
import { removeCountryFromName } from 'utils/removeCountryFromName';

import { useGetTournament } from 'queries/useGetTournament';

import type { Division, TournamentApiResponse } from 'types/tournament';
import type { TCountryCode } from 'countries-list';
import type { Standing } from 'types/standing';

export const fixedTournamentId = '0000128';
const divisionOrder = ['Masters', 'Seniors', 'Juniors'];

const PlayerInfo = ({
    player,
    tournamentId,
    division,
}: {
    player: Standing;
    tournamentId: string;
    division: Division;
}) => {
    const allRounds = Object.keys(player.rounds);
    const maxRound = allRounds[allRounds.length - 1];
    const currentRound = player.rounds[maxRound];

    const playerUrl = useMemo(() => {
        return createPlayerUrl(player.name);
    }, [player.name]);
    return (
        <Card key={player.name}>
            <div className="flex flex-col gap-2">
                <div
                    className={clsx('flex items-center', {
                        'justify-between': player.drop > 0,
                        'justify-end': player.drop === -1,
                    })}
                >
                    {player.drop > 0 && (
                        <div className="text-red-500">
                            <RunningPersonIcon className="shrink-0 h-5 w-5" />
                        </div>
                    )}
                    <div className="flex gap-1 items-center">
                        <Link
                            to={`/tournaments/${tournamentId}/${division}/${playerUrl}`}
                        >
                            <IconButton
                                icon={<ArrowRightIcon />}
                                alt="View more info"
                                variant="text"
                                color="grey"
                                rounded={false}
                            />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <div className="relative inline-flex items-center justify-center w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="text-xl text-gray-600 dark:text-gray-300">
                            {player.placing}
                        </span>
                    </div>
                    <div className="text-center w-full">
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white items-center truncate">
                            {removeCountryFromName(player.name)}
                        </h5>
                        <PlayerRecord record={player.record} />
                    </div>
                    {allRounds && allRounds.length > 0 && (
                        <div className="w-full">
                            <p className="mb-1 text-xs italic text-gray-500 truncate dark:text-gray-400">
                                Latest Result:
                            </p>
                            <ul className="border-y-2 border-gray-200 dark:border-gray-700">
                                <RoundRow
                                    round={currentRound}
                                    roundNum={maxRound}
                                />
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export const WorldsPlayers2024 = () => {
    const { country } = useLoaderData() as { country: string };
    const { tableLayout, toggleTableLayout } = useTableLayout();
    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {
        setCurrentTab(0);
    }, [country]);

    const { data, isPending } = useGetTournament({
        tournamentId: fixedTournamentId,
        select: useCallback(
            (data: TournamentApiResponse) => {
                const divisions = data.tournament_data;
                divisions.forEach((division) => {
                    division.data = division.data.filter((player) =>
                        player.name.includes(`[${country.toUpperCase()}]`)
                    );
                });

                const orderedData = divisions.sort(
                    (a, b) =>
                        divisionOrder.indexOf(a.division) -
                        divisionOrder.indexOf(b.division)
                );

                // remove if array is 0
                orderedData.forEach((division) => {
                    if (division.data.length === 0) {
                        const index = orderedData.indexOf(division);
                        orderedData.splice(index, 1);
                    }
                });

                return {
                    tournament: data.tournament,
                    divisions: orderedData,
                };
            },
            [country]
        ),
    });

    const countryData = useMemo(() => {
        return getCountryData(country.toUpperCase() as TCountryCode);
    }, [country]);

    return (
        <div className="flex flex-col gap-4">
            <SEO title={`Worlds 2024 ${country} players`} />

            {isPending && (
                <div className="flex flex-col justify-center items-center">
                    <LoadingPokeball
                        size="100"
                        alt="Loading worlds 2024 data..."
                        showAlt
                    />
                </div>
            )}

            {!isPending && data && (
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-8">
                        <div className="text-center">
                            <p>
                                Follow{' '}
                                <strong>
                                    {getCountryFlag(country.toUpperCase())}{' '}
                                    {countryData.name}
                                </strong>{' '}
                                players as they compete in the Pokemon World
                                Championships 2024 in Honolulu Hawaii.
                            </p>
                        </div>

                        <Tabs
                            actions={
                                <IconButton
                                    alt="toggle"
                                    icon={
                                        tableLayout === TableLayout.LIST ? (
                                            <QueueListIcon />
                                        ) : (
                                            <TableCellsIcon />
                                        )
                                    }
                                    variant="text"
                                    rounded={false}
                                    color="grey"
                                    onClick={toggleTableLayout}
                                />
                            }
                        >
                            {data.divisions.map((division, index: number) => {
                                return (
                                    <Tab
                                        key={division.division}
                                        active={currentTab === index}
                                        onClick={() => setCurrentTab(index)}
                                    >
                                        {uppercaseFirstLetter(
                                            division.division
                                        )}
                                    </Tab>
                                );
                            })}
                        </Tabs>

                        {data.divisions[currentTab] && (
                            <div>
                                <div className="mb-8 text-center">
                                    <Heading level="2">
                                        {getCountryFlag(country.toUpperCase())}{' '}
                                        {uppercaseFirstLetter(
                                            data.divisions[currentTab].division
                                        )}
                                    </Heading>
                                </div>
                                {tableLayout === TableLayout.LIST ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-baseline">
                                        {data.divisions[currentTab].data.map(
                                            (player: Standing) => {
                                                return (
                                                    <PlayerInfo
                                                        key={player.name}
                                                        player={player}
                                                        division={
                                                            data.divisions[
                                                                currentTab
                                                            ].division
                                                        }
                                                        tournamentId={
                                                            fixedTournamentId
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                ) : (
                                    <div className="rounded-xl dark:text-gray-400 border border-gray-100 dark:border-gray-700  bg-white dark:bg-gray-900 h-full flex flex-col overflow-hidden">
                                        <StandingsList
                                            standings={
                                                data.divisions[currentTab].data
                                            }
                                            tournamentId={fixedTournamentId}
                                            division={
                                                data.divisions[currentTab]
                                                    .division
                                            }
                                            tournamentStatus={FINISHED}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <hr />
                    <CountryList />
                </div>
            )}
        </div>
    );
};
