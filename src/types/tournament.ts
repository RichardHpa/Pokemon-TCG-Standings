import { Standing } from './standing';

export interface Tournament {
  id: string;
  name: string;
  date: {
    start: string;
    end: string;
  };
  decklists: number;
  players: {
    juniors: number;
    seniors: number;
    masters: number;
  };
  winners: {
    juniors: string;
    seniors: string;
    masters: string;
  };
  tournamentStatus: 'finished' | 'running' | 'not-started';
  roundNumbers: {
    juniors: number;
    seniors: number;
    masters: number;
  };
  lastUpdated: string;
  rk9link: string;
}

export type Division = 'juniors' | 'seniors' | 'masters';

export interface TournamentsApiResponse {
  type: 'tcg';
  tournament: Tournament;
  tournament_data: {
    division: Division;
    data: Standing[];
  }[];
}
