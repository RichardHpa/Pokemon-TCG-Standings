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

interface PokemonCard {
  count: number;
  name: string;
  number: string;
  set: string;
}

export interface DeckList {
  pokemon: PokemonCard[];
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
  decklist: DeckList;
  drop: number;
  rounds: Rounds;
}
