import type { Division } from 'types/tournament';
import type { Standing } from 'types/standing';

export interface PinnedPlayerEventProps {
    player: string;
    tournamentId: string;
    division: Division;
}

export type DivisionData = {
    [division in Division]: string[];
};

export interface TournamentData {
    [tournamentId: string]: DivisionData;
}

interface CombinedDivisionInfo {
    division: Division;
    players: Standing[];
}

export interface CombinedInfo {
    tournamentId: string;
    name: string;
    divisions: CombinedDivisionInfo[];
}

export interface PinnedPlayersProviderProps {
    pinPlayer: (
        tournamentId: string,
        division: Division,
        player: string
    ) => void;
    unpinPlayer: (
        tournamentId: string,
        division: Division,
        player: string
    ) => void;
    togglePlayer: (
        tournamentId: string,
        division: Division,
        player: string
    ) => void;
    isPlayerPinned: (
        tournamentId: string,
        division: Division,
        player: string
    ) => boolean;
    localStorageValue: TournamentData;
    combinedPinnedPlayerDetails: CombinedInfo[];
    hasPinnedPlayers: boolean;
}
