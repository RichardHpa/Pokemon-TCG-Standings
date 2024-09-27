import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';

import { useGetPinnedPlayers } from 'hooks/useGetPinnedPlayers';
import { FINISHED } from 'constants/tournament';
import { usePinnedPlayers } from 'providers/PinnedPlayersProvider';
import { PinIcon } from 'icons/PinIcon';
import { createPlayerUrl } from 'utils/createPlayerUrl';

import { IconButton } from 'components/Button/IconButton';
import { ContentCard } from 'components/ContentCard';
import { PlayerRecord } from 'components/PlayerRecord';

import type { ListChildComponentProps, VariableSizeList } from 'react-window';
import type { PinnedTournamentObject } from 'hooks/useGetPinnedPlayers';
import type { Division } from 'types/tournament';
import type { Standing } from 'types/standing';

interface RowProps {
    data: PinnedTournamentObject[];
    index: number;
    setSize: (index: number, size: number | undefined) => void;
    closeDrawer: () => void;
}

interface Player {
    division: Division;
    player: Standing;
}

const getFirstLetterAndUpperCase = (str: string) => {
    return str.charAt(0).toUpperCase();
};

const Row = ({ data, index, setSize, closeDrawer }: RowProps) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const tournament = data[index];

    const players: Player[] = useMemo(() => {
        return Object.entries(tournament.players).reduce<Player[]>(
            (acc, [division, players]) => {
                return acc.concat(
                    players.map((player) => ({
                        division: division as Division,
                        player,
                    }))
                );
            },
            []
        );
    }, [tournament.players]);

    useEffect(() => {
        setSize(index, rowRef.current?.getBoundingClientRect().height);
    }, [setSize, index]);

    return (
        <div ref={rowRef} className="pb-4">
            <ContentCard title={tournament.tournamentName}>
                <div className="text-sm font-medium divide-y divide-gray-200 dark:divide-gray-700">
                    {players.map((player) => {
                        return (
                            <Link
                                key={player.player.name}
                                to={`/tournaments/${tournament.tournamentId}/${player.division}/${createPlayerUrl(
                                    player.player.name
                                )}`}
                                className="flex justify-between align-middle w-full px-4 py-2 text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={closeDrawer}
                            >
                                <span>
                                    (
                                    {getFirstLetterAndUpperCase(
                                        player.division
                                    )}
                                    ) {player.player.placing} -{' '}
                                    {player.player.name}
                                </span>
                                <PlayerRecord
                                    record={player.player.record}
                                    colors={true}
                                />
                            </Link>
                        );
                    })}
                </div>
            </ContentCard>
        </div>
    );
};

interface SizeMap {
    [index: number]: number;
}

const DrawerInner = ({ closeDrawer }: { closeDrawer: () => void }) => {
    const {
        parsedPlayers,
        //  handleClearTournament
    } = usePinnedPlayers();
    const { filteredPlayers: pinnedPlayers, isLoading } =
        useGetPinnedPlayers(parsedPlayers);

    const filteredPlayers = useMemo(() => {
        if (isLoading) {
            return [];
        }
        return pinnedPlayers.filter(
            (tournament) => tournament.tournamentStatus !== FINISHED
        );
    }, [isLoading, pinnedPlayers]);

    // useEffect(() => {
    //     if (isLoading || filteredPlayers.length === 0) {
    //         return;
    //     }

    //     // NOTE: this is causing an issue, I need to figure out a way to clear tournaments that are finished rather than hiding them

    //     // filteredPlayers.forEach((tournament) => {
    //     //     if (tournament.tournamentStatus === FINISHED) {
    //     //         handleClearTournament(tournament.tournamentId);
    //     //     }
    //     // });
    // }, [isLoading, filteredPlayers, handleClearTournament, closeDrawer]);

    const listRef = useRef<VariableSizeList>(null);
    const sizeMap = useRef<SizeMap>({});

    const setSize = useCallback((index: number, size: number | undefined) => {
        if (size === undefined) return;
        sizeMap.current = { ...sizeMap.current, [index]: size };
        listRef.current?.resetAfterIndex(index);
    }, []);

    const getSize = (index: number) => {
        return sizeMap.current[index] || 50;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400">
                Loading pinned players...
            </div>
        );
    }

    if (filteredPlayers.length === 0) {
        return (
            <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400">
                There are no pinned players for active tournaments
            </div>
        );
    }

    return (
        <div className="flex-auto">
            <AutoSizer>
                {({ height, width }: { height: number; width: number }) => {
                    return (
                        <List
                            ref={listRef}
                            height={height}
                            width={width}
                            itemCount={filteredPlayers.length}
                            itemSize={getSize}
                            itemData={filteredPlayers}
                        >
                            {({
                                data,
                                index,
                                style,
                            }: ListChildComponentProps) => (
                                <div style={style}>
                                    <Row
                                        data={data}
                                        index={index}
                                        setSize={setSize}
                                        closeDrawer={closeDrawer}
                                    />
                                </div>
                            )}
                        </List>
                    );
                }}
            </AutoSizer>
        </div>
    );
};

export const PinnedPlayersDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { parsedPlayers } = usePinnedPlayers();

    const handleToggleDrawer = useCallback(() => {
        setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen);
    }, []);

    const handleCloseDrawer = useCallback(() => {
        setIsDrawerOpen(false);
    }, []);

    return (
        <>
            <IconButton
                icon={<PinIcon />}
                alt="View Pinned Players"
                onClick={handleToggleDrawer}
                color={
                    Object.keys(parsedPlayers).length > 0
                        ? 'primary'
                        : 'secondary'
                }
                disabled={Object.keys(parsedPlayers).length === 0}
            />

            <div
                className={clsx(
                    'flex flex-col gap-4 fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white w-96 dark:bg-gray-800 border-l border-gray-500 dark:border-gray-400',
                    {
                        'translate-x-full': !isDrawerOpen,
                    }
                )}
                aria-labelledby="drawer-label"
            >
                <div>
                    <h5
                        id="drawer-label"
                        className="inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
                    >
                        Pinned Players
                    </h5>
                    <button
                        type="button"
                        data-drawer-hide="drawer-example"
                        aria-controls="drawer-example"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={handleCloseDrawer}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close pinned players</span>
                    </button>
                </div>

                {Object.keys(parsedPlayers).length === 0 && (
                    <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400">
                        No pinned players
                    </div>
                )}

                {isDrawerOpen && (
                    <DrawerInner closeDrawer={handleCloseDrawer} />
                )}
            </div>
        </>
    );
};
