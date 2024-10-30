import {
    createContext,
    useContext,
    useCallback,
    useEffect,
    useMemo,
} from 'react';
import { useQueries } from '@tanstack/react-query';

import { RUNNING } from 'constants/tournament';

import { useLocalStorageState } from 'hooks/useLocalStorageState';
import { getTournamentQueryOptions } from 'queries/useGetTournament';

import { PINNED_PLAYERS_KEY } from 'constants/siteKeys';

import type { ReactNode } from 'react';
import type {
    PinnedPlayersProviderProps,
    TournamentData,
    CombinedInfo,
} from './types';
import type { Division } from 'types/tournament';

const PinnedPlayersContext = createContext<PinnedPlayersProviderProps | null>(
    null
);

// eslint-disable-next-line react-refresh/only-export-components
export const usePinnedPlayersContext = () => {
    const currentPinnedPlayers = useContext(PinnedPlayersContext);
    if (!currentPinnedPlayers) {
        throw new Error('PinnedPlayersContext: No value provided');
    }

    return currentPinnedPlayers;
};

export const PinnedPlayersProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [tournamentData, setTournamentData] =
        useLocalStorageState<TournamentData>(PINNED_PLAYERS_KEY, {});

    const tournamentIds = Object.keys(tournamentData);

    // Fetch tournament data using useQueries
    const tournamentQueries = useQueries({
        queries: tournamentIds.map((tournamentId) =>
            getTournamentQueryOptions(tournamentId)
        ),
    });

    // issue is in here. Cant remove pinned player if its the last one in the division
    const updateTournamentData = useCallback(
        (update: Partial<TournamentData>) => {
            setTournamentData((prevData: TournamentData) => {
                // Ensure that we are creating a full TournamentData object
                const mergedData: TournamentData = { ...prevData };

                // Merge in the updates, ensuring we initialize any undefined properties
                for (const tournamentId in update) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            update,
                            tournamentId
                        )
                    ) {
                        const divisionData = update[tournamentId];

                        // If divisionData is defined, merge it
                        if (divisionData) {
                            mergedData[tournamentId] = {
                                // ...mergedData[tournamentId],
                                ...divisionData,
                            };
                        }
                    }
                }

                return mergedData;
            });
        },
        [setTournamentData]
    );

    const removeTournament = useCallback(
        (tournamentId: string) => {
            setTournamentData((prevData) => {
                const { [tournamentId]: _, ...remainingData } = prevData;
                return remainingData;
            });
        },
        [setTournamentData]
    );

    // Check if a player is pinned within a specific division
    const isPlayerPinned = useCallback(
        (tournamentId: string, division: Division, playerId: string) => {
            return !!tournamentData[tournamentId]?.[division]?.some(
                (player) => player === playerId
            );
        },
        [tournamentData]
    );

    const pinPlayer = useCallback(
        (tournamentId: string, division: Division, player: string) => {
            updateTournamentData({
                [tournamentId]: {
                    ...(tournamentData[tournamentId] || {}),
                    [division]: [
                        ...(tournamentData[tournamentId]?.[division] || []),
                        player,
                    ],
                },
            });
        },
        [tournamentData, updateTournamentData]
    );

    const unpinPlayer = useCallback(
        (tournamentId: string, division: Division, playerId: string) => {
            const updatedDivision = (
                tournamentData[tournamentId]?.[division] || []
            ).filter((player) => player !== playerId);

            const updatedTournament = {
                ...tournamentData[tournamentId],
                [division]: updatedDivision,
            };

            if (updatedDivision.length === 0) {
                delete updatedTournament[division];
            }

            if (Object.keys(updatedTournament).length === 0) {
                removeTournament(tournamentId);
            } else {
                updateTournamentData({ [tournamentId]: updatedTournament });
            }
        },
        [removeTournament, tournamentData, updateTournamentData]
    );

    const togglePlayer = useCallback(
        (tournamentId: string, division: Division, player: string) => {
            if (isPlayerPinned(tournamentId, division, player)) {
                unpinPlayer(tournamentId, division, player);
            } else {
                pinPlayer(tournamentId, division, player);
            }
        },
        [isPlayerPinned, pinPlayer, unpinPlayer]
    );

    // Check for finished tournaments and remove them from local storage
    useEffect(() => {
        tournamentQueries.forEach((query, index) => {
            const tournamentId = tournamentIds[index];
            if (
                query.data &&
                query.data.tournament.tournamentStatus !== RUNNING
            ) {
                // Remove the tournament from local storage
                setTournamentData((prevData: TournamentData) => {
                    const { [tournamentId]: _, ...rest } = prevData; // Remove the tournament from the object
                    return rest; // Return the updated object
                });
            }
        });
    }, [tournamentQueries, tournamentIds, setTournamentData]);

    // Combine results to extract only pinned player details
    const combinedPinnedPlayerDetails = tournamentIds
        .map((tournamentId) => {
            const tournamentQuery = tournamentQueries.find(
                (query) => query.data?.tournament.id === tournamentId
            );

            if (tournamentQuery && tournamentQuery.data) {
                const { tournament, tournament_data } = tournamentQuery.data;

                const pinnedDivisions = tournament_data
                    .map((divisionData) => {
                        const divisionName = divisionData.division as Division;
                        const pinnedPlayerNames =
                            tournamentData[tournamentId]?.[divisionName] || [];

                        // Filter only pinned players' details within this division
                        const pinnedPlayers = divisionData.data.filter(
                            (player) => pinnedPlayerNames.includes(player.name)
                        );

                        // Only include divisions with pinned players
                        if (pinnedPlayers.length > 0) {
                            return {
                                division: divisionName,
                                players: pinnedPlayers,
                            };
                        }
                        return null;
                    })
                    .filter((division) => division !== null) as {
                    division: Division;
                    players: { name: string }[];
                }[];

                if (pinnedDivisions.length > 0) {
                    return {
                        tournamentId: tournament.id,
                        name: tournament.name,
                        divisions: pinnedDivisions,
                    };
                }
            }
            return null;
        })
        .filter((item) => item !== null) as CombinedInfo[];

    const values = useMemo(() => {
        return {
            pinPlayer,
            unpinPlayer,
            togglePlayer,
            localStorageValue: tournamentData,
            isPlayerPinned,
            combinedPinnedPlayerDetails,
            hasPinnedPlayers: combinedPinnedPlayerDetails.length > 0,
        };
    }, [
        combinedPinnedPlayerDetails,
        isPlayerPinned,
        pinPlayer,
        togglePlayer,
        tournamentData,
        unpinPlayer,
    ]);

    return (
        <PinnedPlayersContext.Provider value={values}>
            {children}
        </PinnedPlayersContext.Provider>
    );
};
