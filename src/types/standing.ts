export type Results = 'wins' | 'losses' | 'ties';

export type RecordProps = {
  [key in Results]: number;
};

export interface Round {
  name: string;
  result: string;
  table: number;
}

export interface Rounds {
  [key: string]: Round;
}

export interface DeckList {
  pokemon: unknown[];
  trainer: unknown[];
  energy: unknown[];
}

export interface Standing {
  name: string;
  placing: number;
  record: RecordProps;
  resistances: {
    self: number;
    opp: number;
    oppopp: number;
  };
  decklist?: DeckList;
  drop: number;
  rounds: Rounds;
}
