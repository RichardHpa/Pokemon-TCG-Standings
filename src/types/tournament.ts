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
  tournamentStatus: 'finished' | 'running';
  roundNumbers: {
    juniors: number;
    seniors: number;
    masters: number;
  };
  lastUpdated: string;
  rk9link: string;
}
