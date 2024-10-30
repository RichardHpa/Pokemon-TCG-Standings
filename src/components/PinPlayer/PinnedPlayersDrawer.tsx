import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';

// import { useGetPinnedPlayers } from 'hooks/useGetPinnedPlayers';
// import { FINISHED } from 'constants/tournament';
// import { usePinnedPlayers } from 'providers/PinnedPlayersProvider';
import { usePinnedPlayersContext } from 'providers/PinnedPlayersProviderV2';
import { PinIcon } from 'icons/PinIcon';
import { createPlayerUrl } from 'utils/createPlayerUrl';

import { IconButton } from 'components/Button/IconButton';
import { ContentCard } from 'components/ContentCard';
import { PlayerRecord } from 'components/PlayerRecord';

import type { ListChildComponentProps, VariableSizeList } from 'react-window';
import type { Division } from 'types/tournament';
import type { Standing } from 'types/standing';

import type { CombinedInfo } from 'providers/PinnedPlayersProviderV2/types';

interface RowProps {
    data: CombinedInfo[];
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
    const pinnedInfo = data[index];

    useEffect(() => {
        setSize(index, rowRef.current?.getBoundingClientRect().height);
    }, [setSize, index]);

    const players = useMemo(() => {
        return pinnedInfo.divisions.reduce<Player[]>(
            (acc, { division, players }) => {
                return acc.concat(
                    players.map((player) => ({
                        division,
                        player,
                    }))
                );
            },
            []
        );
    }, [pinnedInfo]);

    return (
        <div ref={rowRef} className="pb-4">
            <ContentCard title={pinnedInfo.name}>
                <div className="text-sm font-medium divide-y divide-gray-200 dark:divide-gray-700">
                    {players.map((player) => {
                        return (
                            <Link
                                key={player.player.name}
                                to={`/tournaments/${pinnedInfo.tournamentId}/${player.division}/${createPlayerUrl(
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

const DrawerInner = ({
    // pinnedTournaments,
    closeDrawer,
}: {
    // pinnedTournaments: tournamentsQueryOptionsResult[];
    closeDrawer: () => void;
}) => {
    const { combinedPinnedPlayerDetails } = usePinnedPlayersContext();
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

    return (
        <div className="flex-auto">
            <AutoSizer>
                {({ height, width }: { height: number; width: number }) => {
                    return (
                        <List
                            ref={listRef}
                            height={height}
                            width={width}
                            itemCount={combinedPinnedPlayerDetails.length}
                            itemSize={getSize}
                            itemData={combinedPinnedPlayerDetails}
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

// const DrawerLoader = ({ closeDrawer }: { closeDrawer: () => void }) => {
//     const { combinedPinnedPlayerDetails } = usePinnedPlayersContext();
//     // const { data, isPending, isError } = useGetPinnedPlayers(parsedPlayers);
//     // const definedData = data.every((tournament) => tournament !== undefined);

//     // if (isPending) {
//     //     return (
//     //         <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400">
//     //             Loading pinned players...
//     //         </div>
//     //     );
//     // }

//     // if (isError) {
//     //     return (
//     //         <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400">
//     //             Error loading pinned players...
//     //         </div>
//     //     );
//     // }

//     // if (!data) {
//     //     return (
//     //         <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400">
//     //             There are no pinned players for active tournaments
//     //         </div>
//     //     );
//     // }

//     // if (definedData) {
//     //     return (
//     //         <DrawerInner pinnedTournaments={data} closeDrawer={closeDrawer} />
//     //     );
//     // }

//     return null;
// };

export const PinnedPlayersDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // const { parsedPlayers } = usePinnedPlayers();
    const { hasPinnedPlayers } = usePinnedPlayersContext();

    const handleToggleDrawer = useCallback(() => {
        setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen);
    }, []);

    // this should probably be a context so we don't have to pass it down
    const handleCloseDrawer = useCallback(() => {
        setIsDrawerOpen(false);
    }, []);

    return (
        <>
            <IconButton
                icon={<PinIcon />}
                alt="View Pinned Players"
                onClick={handleToggleDrawer}
                color={hasPinnedPlayers ? 'primary' : 'secondary'}
                disabled={!hasPinnedPlayers}
            />

            <div
                className={clsx(
                    'flex flex-col gap-4 fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white w-96 dark:bg-gray-800 border-l border-gray-500 dark:border-gray-400',
                    {
                        'translate-x-full': !isDrawerOpen,
                    }
                )}
            >
                <div>
                    <h5 className="inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400">
                        Pinned Players
                    </h5>
                    <button
                        type="button"
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

                {!hasPinnedPlayers && (
                    <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400">
                        No pinned players
                    </div>
                )}

                {/* {isDrawerOpen && (
                    <DrawerLoader closeDrawer={handleCloseDrawer} />
                )} */}
                {isDrawerOpen && (
                    <DrawerInner closeDrawer={handleCloseDrawer} />
                )}
            </div>
        </>
    );
};
