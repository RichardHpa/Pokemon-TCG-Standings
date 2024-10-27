import type { Standing } from './standing';

export type Division = 'juniors' | 'seniors' | 'masters' | 'juniorsseniors';
export type TournamentStatus =
    | 'finished'
    | 'running'
    | 'not-started'
    | 'check-in';

export type DivisionMap<T> = {
    [key in Division]?: T;
};

export interface Tournament {
    id: string;
    name: string;
    date: {
        start: string;
        end: string;
    };
    decklists: number;
    players: DivisionMap<number | string>;
    winners: DivisionMap<string | null>;
    tournamentStatus: TournamentStatus;
    roundNumbers: DivisionMap<number | null>;
    lastUpdated: string;
    rk9link: string;
}

export interface TournamentsApiResponse {
    tcg: {
        type: 'tcg';
        data: Tournament[];
    };
}

export interface TournamentApiResponse {
    type: 'tcg';
    tournament: Tournament;
    tournament_data: {
        division: Division;
        data: Standing[];
    }[];
}
