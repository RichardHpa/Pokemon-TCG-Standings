/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateTournament = /* GraphQL */ `subscription OnCreateTournament(
  $filter: ModelSubscriptionTournamentFilterInput
) {
  onCreateTournament(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTournamentSubscriptionVariables,
  APITypes.OnCreateTournamentSubscription
>;
export const onUpdateTournament = /* GraphQL */ `subscription OnUpdateTournament(
  $filter: ModelSubscriptionTournamentFilterInput
) {
  onUpdateTournament(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTournamentSubscriptionVariables,
  APITypes.OnUpdateTournamentSubscription
>;
export const onDeleteTournament = /* GraphQL */ `subscription OnDeleteTournament(
  $filter: ModelSubscriptionTournamentFilterInput
) {
  onDeleteTournament(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTournamentSubscriptionVariables,
  APITypes.OnDeleteTournamentSubscription
>;
