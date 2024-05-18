/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getTournament = /* GraphQL */ `query GetTournament($id: ID!) {
  getTournament(id: $id) {
    id
    pokeDataId
    name
    tournamentStatus
    decklists
    players {
      juniors
      seniors
      masters
    }
    winners {
      juniors
      seniors
      masters
    }
    roundNumbers {
      juniors
      seniors
      masters
    }
    pokeDataLastUpdated
    rk9link
    startDate
    endDate
    type
    region
    apiType
    createdAt
    updatedAt
  }
}
` as GeneratedQuery<
  APITypes.GetTournamentQueryVariables,
  APITypes.GetTournamentQuery
>;
export const listTournaments = /* GraphQL */ `query ListTournaments(
  $filter: ModelTournamentFilterInput
  $limit: Int
  $nextToken: String
) {
  listTournaments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      pokeDataId
      name
      tournamentStatus
      decklists
      players {
        juniors
        seniors
        masters
      }
      winners {
        juniors
        seniors
        masters
      }
      roundNumbers {
        juniors
        seniors
        masters
      }
      pokeDataLastUpdated
      rk9link
      startDate
      endDate
      type
      region
      apiType
      createdAt
      updatedAt
    }
    nextToken
  }
}
` as GeneratedQuery<
  APITypes.ListTournamentsQueryVariables,
  APITypes.ListTournamentsQuery
>;
export const getTournamentsByStartDate = /* GraphQL */ `query GetTournamentsByStartDate(
  $apiType: String!
  $startDate: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelTournamentFilterInput
  $limit: Int
  $nextToken: String
) {
  getTournamentsByStartDate(
    apiType: $apiType
    startDate: $startDate
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      pokeDataId
      name
      tournamentStatus
      decklists
      players {
        juniors
        seniors
        masters
      }
      winners {
        juniors
        seniors
        masters
      }
      roundNumbers {
        juniors
        seniors
        masters
      }
      pokeDataLastUpdated
      rk9link
      startDate
      endDate
      type
      region
      apiType
      createdAt
      updatedAt
    }
    nextToken
  }
}
` as GeneratedQuery<
  APITypes.GetTournamentsByStartDateQueryVariables,
  APITypes.GetTournamentsByStartDateQuery
>;
