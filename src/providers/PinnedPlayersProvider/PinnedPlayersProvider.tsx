import { useState, createContext, useMemo, useCallback } from 'react';
import { pinnedPlayersKey } from 'constants/siteKeys';

import type { Division } from 'types/tournament';
import type { ReactNode } from 'react';

interface PinnedPlayersProps {
    [tournamentId: string]: {
        [division: string]: string[];
    };
}
interface PinnedPlayersContextProps {
    pinnedPlayers: unknown;
    handlePinPlayer: (
        playerName: string,
        tournamentId: string,
        division: Division
    ) => void;
    handleUnpinPlayer: (
        playerName: string,
        tournamentId: string,
        division: Division
    ) => void;
    togglePinPlayer: (
        playerName: string,
        tournamentId: string,
        division: Division
    ) => void;
    inPinned: (
        playerName: string,
        tournamentId: string,
        division: Division
    ) => boolean;
    parsedPlayers: PinnedPlayersProps;
    handleClearTournament: (tournamentId: string) => void;
}

export const LikedContext = createContext<PinnedPlayersContextProps>({
    pinnedPlayers: {},
    handlePinPlayer: () => {},
    handleUnpinPlayer: () => {},
    togglePinPlayer: () => {},
    inPinned: () => false,
    parsedPlayers: {},
    handleClearTournament: () => {},
});

const getPinnedPlayers = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const pinnedPlayers = window.localStorage.getItem(pinnedPlayersKey);
        if (pinnedPlayers) {
            return pinnedPlayers;
        }
    }

    return JSON.stringify({});
};

interface PinnedPlayersProviderProps {
    children: ReactNode;
}

export const PinnedPlayersProvider = ({
    children,
}: PinnedPlayersProviderProps) => {
    const [pinnedPlayers, setPinnedPlayers] = useState<string>(() => {
        return getPinnedPlayers();
    });

    const handlePinPlayer = useCallback(
        (playerName: string, tournamentId: string, division: Division) => {
            const parsedPinnedPlayers = JSON.parse(pinnedPlayers);

            if (!parsedPinnedPlayers[tournamentId]) {
                parsedPinnedPlayers[tournamentId] = {
                    [division]: [playerName],
                };
            } else if (!parsedPinnedPlayers[tournamentId][division]) {
                parsedPinnedPlayers[tournamentId][division] = [playerName];
            } else {
                parsedPinnedPlayers[tournamentId][division].push(playerName);
            }

            const stringifyPinnedPlayers = JSON.stringify(parsedPinnedPlayers);
            setPinnedPlayers(stringifyPinnedPlayers);
            localStorage.setItem(pinnedPlayersKey, stringifyPinnedPlayers);
        },
        [pinnedPlayers]
    );

    const handleUnpinPlayer = useCallback(
        (playerName: string, tournamentId: string, division: Division) => {
            const parsedPinnedPlayers = JSON.parse(pinnedPlayers);

            if (parsedPinnedPlayers[tournamentId]) {
                parsedPinnedPlayers[tournamentId][division] =
                    parsedPinnedPlayers[tournamentId][division].filter(
                        (p: string) => p !== playerName
                    );
            }

            if (parsedPinnedPlayers[tournamentId][division].length === 0) {
                delete parsedPinnedPlayers[tournamentId][division];
            }
            if (Object.keys(parsedPinnedPlayers[tournamentId]).length === 0) {
                delete parsedPinnedPlayers[tournamentId];
            }

            const stringifyPinnedPlayers = JSON.stringify(parsedPinnedPlayers);
            setPinnedPlayers(stringifyPinnedPlayers);
            localStorage.setItem(pinnedPlayersKey, stringifyPinnedPlayers);
        },
        [pinnedPlayers]
    );

    const inPinned = useCallback(
        (playerName: string, tournamentId: string, division: Division) => {
            const parsedPinnedPlayers = JSON.parse(pinnedPlayers);
            return parsedPinnedPlayers[tournamentId]?.[division]?.includes(
                playerName
            );
        },
        [pinnedPlayers]
    );

    const togglePinPlayer = useCallback(
        (playerName: string, tournamentId: string, division: Division) => {
            if (!inPinned(playerName, tournamentId, division)) {
                handlePinPlayer(playerName, tournamentId, division);
            } else {
                handleUnpinPlayer(playerName, tournamentId, division);
            }
        },
        [inPinned, handlePinPlayer, handleUnpinPlayer]
    );

    const handleClearTournament = useCallback(
        (tournamentId: string) => {
            const parsedPinnedPlayers = JSON.parse(pinnedPlayers);
            delete parsedPinnedPlayers[tournamentId];

            const stringifyPinnedPlayers = JSON.stringify(parsedPinnedPlayers);
            setPinnedPlayers(stringifyPinnedPlayers);
            localStorage.setItem(pinnedPlayersKey, stringifyPinnedPlayers);
        },
        [pinnedPlayers]
    );

    const value = useMemo(() => {
        return {
            pinnedPlayers,
            handlePinPlayer,
            handleUnpinPlayer,
            togglePinPlayer,
            inPinned,
            parsedPlayers: JSON.parse(pinnedPlayers),
            handleClearTournament,
        };
    }, [
        handlePinPlayer,
        handleUnpinPlayer,
        inPinned,
        pinnedPlayers,
        togglePinPlayer,
        handleClearTournament,
    ]);

    return (
        <LikedContext.Provider value={value}>{children}</LikedContext.Provider>
    );
};
