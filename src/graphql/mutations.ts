/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createTournament = /* GraphQL */ `mutation CreateTournament(
  $input: CreateTournamentInput!
  $condition: ModelTournamentConditionInput
) {
  createTournament(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTournamentMutationVariables,
  APITypes.CreateTournamentMutation
>;
export const updateTournament = /* GraphQL */ `mutation UpdateTournament(
  $input: UpdateTournamentInput!
  $condition: ModelTournamentConditionInput
) {
  updateTournament(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTournamentMutationVariables,
  APITypes.UpdateTournamentMutation
>;
export const deleteTournament = /* GraphQL */ `mutation DeleteTournament(
  $input: DeleteTournamentInput!
  $condition: ModelTournamentConditionInput
) {
  deleteTournament(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTournamentMutationVariables,
  APITypes.DeleteTournamentMutation
>;
