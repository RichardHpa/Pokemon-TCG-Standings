/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTournamentInput = {
  id?: string | null,
  pokeDataId: string,
  name: string,
  tournamentStatus: string,
  decklists: number,
  players?: TournamentPlayersCountInput | null,
  winners?: TournamentPlayersInput | null,
  roundNumbers?: TournamentRoundsInput | null,
  pokeDataLastUpdated: string,
  rk9link: string,
  startDate: string,
  endDate: string,
  type?: TournamentType | null,
  region?: Region | null,
  apiType: string,
};

export type TournamentPlayersCountInput = {
  juniors?: number | null,
  seniors?: number | null,
  masters?: number | null,
};

export type TournamentPlayersInput = {
  juniors?: string | null,
  seniors?: string | null,
  masters?: string | null,
};

export type TournamentRoundsInput = {
  juniors?: number | null,
  seniors?: number | null,
  masters?: number | null,
};

export enum TournamentType {
  Worlds = "Worlds",
  International = "International",
  Regional = "Regional",
  SpecialEvent = "SpecialEvent",
  Cup = "Cup",
}


export enum Region {
  UsaCanada = "UsaCanada",
  Europe = "Europe",
  LatinAmerica = "LatinAmerica",
  Oceania = "Oceania",
  Asia = "Asia",
  MiddleEastSouthAfrica = "MiddleEastSouthAfrica",
  Russia = "Russia",
  Worlds = "Worlds",
  Unknown = "Unknown",
}


export type ModelTournamentConditionInput = {
  pokeDataId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  tournamentStatus?: ModelStringInput | null,
  decklists?: ModelIntInput | null,
  pokeDataLastUpdated?: ModelStringInput | null,
  rk9link?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  type?: ModelTournamentTypeInput | null,
  region?: ModelRegionInput | null,
  apiType?: ModelStringInput | null,
  and?: Array< ModelTournamentConditionInput | null > | null,
  or?: Array< ModelTournamentConditionInput | null > | null,
  not?: ModelTournamentConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelTournamentTypeInput = {
  eq?: TournamentType | null,
  ne?: TournamentType | null,
};

export type ModelRegionInput = {
  eq?: Region | null,
  ne?: Region | null,
};

export type Tournament = {
  __typename: "Tournament",
  id: string,
  pokeDataId: string,
  name: string,
  tournamentStatus: string,
  decklists: number,
  players?: TournamentPlayersCount | null,
  winners?: TournamentPlayers | null,
  roundNumbers?: TournamentRounds | null,
  pokeDataLastUpdated: string,
  rk9link: string,
  startDate: string,
  endDate: string,
  type?: TournamentType | null,
  region?: Region | null,
  apiType: string,
  createdAt: string,
  updatedAt: string,
};

export type TournamentPlayersCount = {
  __typename: "TournamentPlayersCount",
  juniors?: number | null,
  seniors?: number | null,
  masters?: number | null,
};

export type TournamentPlayers = {
  __typename: "TournamentPlayers",
  juniors?: string | null,
  seniors?: string | null,
  masters?: string | null,
};

export type TournamentRounds = {
  __typename: "TournamentRounds",
  juniors?: number | null,
  seniors?: number | null,
  masters?: number | null,
};

export type UpdateTournamentInput = {
  id: string,
  pokeDataId?: string | null,
  name?: string | null,
  tournamentStatus?: string | null,
  decklists?: number | null,
  players?: TournamentPlayersCountInput | null,
  winners?: TournamentPlayersInput | null,
  roundNumbers?: TournamentRoundsInput | null,
  pokeDataLastUpdated?: string | null,
  rk9link?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  type?: TournamentType | null,
  region?: Region | null,
  apiType?: string | null,
};

export type DeleteTournamentInput = {
  id: string,
};

export type ModelTournamentFilterInput = {
  id?: ModelIDInput | null,
  pokeDataId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  tournamentStatus?: ModelStringInput | null,
  decklists?: ModelIntInput | null,
  pokeDataLastUpdated?: ModelStringInput | null,
  rk9link?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  type?: ModelTournamentTypeInput | null,
  region?: ModelRegionInput | null,
  apiType?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTournamentFilterInput | null > | null,
  or?: Array< ModelTournamentFilterInput | null > | null,
  not?: ModelTournamentFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTournamentConnection = {
  __typename: "ModelTournamentConnection",
  items:  Array<Tournament | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionTournamentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  pokeDataId?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  tournamentStatus?: ModelSubscriptionStringInput | null,
  decklists?: ModelSubscriptionIntInput | null,
  pokeDataLastUpdated?: ModelSubscriptionStringInput | null,
  rk9link?: ModelSubscriptionStringInput | null,
  startDate?: ModelSubscriptionStringInput | null,
  endDate?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  region?: ModelSubscriptionStringInput | null,
  apiType?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTournamentFilterInput | null > | null,
  or?: Array< ModelSubscriptionTournamentFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateTournamentMutationVariables = {
  input: CreateTournamentInput,
  condition?: ModelTournamentConditionInput | null,
};

export type CreateTournamentMutation = {
  createTournament?:  {
    __typename: "Tournament",
    id: string,
    pokeDataId: string,
    name: string,
    tournamentStatus: string,
    decklists: number,
    players?:  {
      __typename: "TournamentPlayersCount",
      juniors?: number | null,
      seniors?: number | null,
      masters?: number | null,
    } | null,
    winners?:  {
      __typename: "TournamentPlayers",
      juniors?: string | null,
      seniors?: string | null,
      masters?: string | null,
    } | null,
    roundNumbers?:  {
      __typename: "TournamentRounds",
      juniors?: number | null,
      seniors?: number | null,
      masters?: number | null,
    } | null,
    pokeDataLastUpdated: string,
    rk9link: string,
    startDate: string,
    endDate: string,
    type?: TournamentType | null,
    region?: Region | null,
    apiType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTournamentMutationVariables = {
  input: UpdateTournamentInput,
  condition?: ModelTournamentConditionInput | null,
};

export type UpdateTournamentMutation = {
  updateTournament?:  {
    __typename: "Tournament",
    id: string,
    pokeDataId: string,
    name: string,
    tournamentStatus: string,
    decklists: number,
    players?:  {
      __typename: "TournamentPlayersCount",
      juniors?: number | null,
      seniors?: number | null,
      masters?: number | null,
    } | null,
    winners?:  {
      __typename: "TournamentPlayers",
      juniors?: string | null,
      seniors?: string | null,
      masters?: string | null,
    } | null,
    roundNumbers?:  {
      __typename: "TournamentRounds",
      juniors?: number | null,
      seniors?: number | null,
      masters?: number | null,
    } | null,
    pokeDataLastUpdated: string,
    rk9link: string,
    startDate: string,
    endDate: string,
    type?: TournamentType | null,
    region?: Region | null,
    apiType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTournamentMutationVariables = {
  input: DeleteTournamentInput,
  condition?: ModelTournamentConditionInput | null,
};

export type DeleteTournamentMutation = {
  deleteTournament?:  {
    __typename: "Tournament",
    id: string,
    pokeDataId: string,
    name: string,
    tournamentStatus: string,
    decklists: number,
    players?:  {
      __typename: "TournamentPlayersCount",
      juniors?: number | null,
      seniors?: number | null,
      masters?: number | null,
    } | null,
    winners?:  {
      __typename: "TournamentPlayers",
      juniors?: string | null,
      seniors?: string | null,
      masters?: string | null,
    } | null,
    roundNumbers?:  {
      __typename: "TournamentRounds",
      juniors?: number | null,
      seniors?: number | null,
      masters?: number | null,
    } | null,
    pokeDataLastUpdated: string,
    rk9link: string,
    startDate: string,
    endDate: string,
    type?: TournamentType | null,
    region?: Region | null,
    apiType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTournamentQueryVariables = {
  id: string,
};

export type GetTournamentQuery = {
  getTournament?:  {
    __typename: "Tournament",
    id: string,
    pokeDataId: string,
    name: string,
    tournamentStatus: string,
    decklists: number,
    players?:  {
      __typename: "TournamentPlayersCount",
      juniors?: number | null,
      seniors?: number | null,
      masters?: number | null,
    } | null,
    winners?:  {
      __typename: "TournamentPlayers",
      juniors?: string | null,
      seniors?: string | null,
      masters?: string | null,
    } | null,
    roundNumbers?:  {
      __typename: "TournamentRounds",
      juniors?: number | null,
      seniors?: number | null,
      masters?: number | null,
    } | null,
    pokeDataLastUpdated: string,
    rk9link: string,
    startDate: string,
    endDate: string,
    type?: TournamentType | null,
    region?: Region | null,
    apiType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTournamentsQueryVariables = {
  filter?: ModelTournamentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTournamentsQuery = {
  listTournaments?:  {
    __typename: "ModelTournamentConnection",
    items:  Array< {
      __typename: "Tournament",
      id: string,
      pokeDataId: string,
      name: string,
      tournamentStatus: string,
      decklists: number,
      players?:  {
        __typename: "TournamentPlayersCount",
        juniors?: number | null,
        seniors?: number | null,
        masters?: number | null,
      } | null,
      winners?:  {
        __typename: "TournamentPlayers",
        juniors?: string | null,
        seniors?: string | null,
        masters?: string | null,
      } | null,
      roundNumbers?:  {
        __typename: "TournamentRounds",
        juniors?: number | null,
        seniors?: number | null,
        masters?: number | null,
      } | null,
      pokeDataLastUpdated: string,
      rk9link: string,
      startDate: string,
      endDate: string,
      type?: TournamentType | null,
      region?: Region | null,
      apiType: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTournamentsByStartDateQueryVariables = {
  apiType: string,
  startDate?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTournamentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetTournamentsByStartDateQuery = {
  getTournamentsByStartDate?:  {
    __typename: "ModelTournamentConnection",
    items:  Array< {
      __typename: "Tournament",
      id: string,
      pokeDataId: string,
      name: string,
      tournamentStatus: string,
      decklists: number,
      players?:  {
        __typename: "TournamentPlayersCount",
        juniors?: number | null,
        seniors?: number | null,
        masters?: number | null,
      } | null,
      winners?:  {
        __typename: "TournamentPlayers",
        juniors?: string | null,
        seniors?: string | null,
        masters?: string | null,
      } | null,
      roundNumbers?:  {
        __typename: "TournamentRounds",
        juniors?: number | null,
        seniors?: number | null,
        masters?: number | null,
      } | null,
      pokeDataLastUpdated: string,
      rk9link: string,
      startDate: string,
      endDate: string,
      type?: TournamentType | null,
      region?: Region | null,
      apiType: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTournamentSubscriptionVariables = {
  filter?: ModelSubscriptionTournamentFilterInput | null,
};

export type OnCreateTournamentSubscription = {
  onCreateTournament?:  {
    __typename: "Tournament",
    id: string,
    pokeDataId: string,
    name: string,
    tournamentStatus: string,
    decklists: number,
    players?:  {
      __typename: "TournamentPlayersCount",
      juniors?: number | null,
      seniors?: number | null,
      masters?: number | null,
    } | null,
    winners?:  {
      __typename: "TournamentPlayers",
      juniors?: string | null,
      seniors?: string | null,
      masters?: string | null,
    } | null,
    roundNumbers?:  {
      __typename: "TournamentRounds",
      juniors?: number | null,
      seniors?: number | null,
      masters?: number | null,
    } | null,
    pokeDataLastUpdated: string,
    rk9link: string,
    startDate: string,
    endDate: string,
    type?: TournamentType | null,
    region?: Region | null,
    apiType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTournamentSubscriptionVariables = {
  filter?: ModelSubscriptionTournamentFilterInput | null,
};

export type OnUpdateTournamentSubscription = {
  onUpdateTournament?:  {
    __typename: "Tournament",
    id: string,
    pokeDataId: string,
    name: string,
    tournamentStatus: string,
    decklists: number,
    players?:  {
      __typename: "TournamentPlayersCount",
      juniors?: number | null,
      seniors?: number | null,
      masters?: number | null,
    } | null,
    winners?:  {
      __typename: "TournamentPlayers",
      juniors?: string | null,
      seniors?: string | null,
      masters?: string | null,
    } | null,
    roundNumbers?:  {
      __typename: "TournamentRounds",
      juniors?: number | null,
      seniors?: number | null,
      masters?: number | null,
    } | null,
    pokeDataLastUpdated: string,
    rk9link: string,
    startDate: string,
    endDate: string,
    type?: TournamentType | null,
    region?: Region | null,
    apiType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTournamentSubscriptionVariables = {
  filter?: ModelSubscriptionTournamentFilterInput | null,
};

export type OnDeleteTournamentSubscription = {
  onDeleteTournament?:  {
    __typename: "Tournament",
    id: string,
    pokeDataId: string,
    name: string,
    tournamentStatus: string,
    decklists: number,
    players?:  {
      __typename: "TournamentPlayersCount",
      juniors?: number | null,
      seniors?: number | null,
      masters?: number | null,
    } | null,
    winners?:  {
      __typename: "TournamentPlayers",
      juniors?: string | null,
      seniors?: string | null,
      masters?: string | null,
    } | null,
    roundNumbers?:  {
      __typename: "TournamentRounds",
      juniors?: number | null,
      seniors?: number | null,
      masters?: number | null,
    } | null,
    pokeDataLastUpdated: string,
    rk9link: string,
    startDate: string,
    endDate: string,
    type?: TournamentType | null,
    region?: Region | null,
    apiType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
