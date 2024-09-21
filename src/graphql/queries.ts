/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API';
type GeneratedQuery<InputType, OutputType> = string & {
    __generatedQueryInput: InputType;
    __generatedQueryOutput: OutputType;
};

export const getTournament = /* GraphQL */ `query GetTournament($id: ID!) {
  getTournament(id: $id) {
    id
    pokeDataId
    name
    date {
      start
      end
      __typename
    }
    tournamentStatus
    decklists
    players {
      juniors
      seniors
      masters
      __typename
    }
    winners {
      juniors
      seniors
      masters
      __typename
    }
    roundNumbers {
      juniors
      seniors
      masters
      __typename
    }
    pokeDataLastUpdated
    rk9link
    createdAt
    updatedAt
    __typename
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
      pokeDataLastUpdated
      rk9link
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ListTournamentsQueryVariables,
    APITypes.ListTournamentsQuery
>;
