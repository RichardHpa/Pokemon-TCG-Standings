/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTournamentInput = {
    id?: string | null;
    pokeDataId: string;
    name: string;
    date: TournamentDateInput;
    tournamentStatus: string;
    decklists: number;
    players?: TournamentPlayersInput | null;
    winners?: TournamentPlayersInput | null;
    roundNumbers?: TournamentPlayersInput | null;
    pokeDataLastUpdated: string;
    rk9link: string;
};

export type TournamentDateInput = {
    start: string;
    end: string;
};

export type TournamentPlayersInput = {
    juniors: string;
    seniors: string;
    masters: string;
};

export type ModelTournamentConditionInput = {
    pokeDataId?: ModelStringInput | null;
    name?: ModelStringInput | null;
    tournamentStatus?: ModelStringInput | null;
    decklists?: ModelIntInput | null;
    pokeDataLastUpdated?: ModelStringInput | null;
    rk9link?: ModelStringInput | null;
    and?: Array<ModelTournamentConditionInput | null> | null;
    or?: Array<ModelTournamentConditionInput | null> | null;
    not?: ModelTournamentConditionInput | null;
    createdAt?: ModelStringInput | null;
    updatedAt?: ModelStringInput | null;
};

export type ModelStringInput = {
    ne?: string | null;
    eq?: string | null;
    le?: string | null;
    lt?: string | null;
    ge?: string | null;
    gt?: string | null;
    contains?: string | null;
    notContains?: string | null;
    between?: Array<string | null> | null;
    beginsWith?: string | null;
    attributeExists?: boolean | null;
    attributeType?: ModelAttributeTypes | null;
    size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
    binary = 'binary',
    binarySet = 'binarySet',
    bool = 'bool',
    list = 'list',
    map = 'map',
    number = 'number',
    numberSet = 'numberSet',
    string = 'string',
    stringSet = 'stringSet',
    _null = '_null',
}

export type ModelSizeInput = {
    ne?: number | null;
    eq?: number | null;
    le?: number | null;
    lt?: number | null;
    ge?: number | null;
    gt?: number | null;
    between?: Array<number | null> | null;
};

export type ModelIntInput = {
    ne?: number | null;
    eq?: number | null;
    le?: number | null;
    lt?: number | null;
    ge?: number | null;
    gt?: number | null;
    between?: Array<number | null> | null;
    attributeExists?: boolean | null;
    attributeType?: ModelAttributeTypes | null;
};

export type Tournament = {
    __typename: 'Tournament';
    id: string;
    pokeDataId: string;
    name: string;
    date: TournamentDate;
    tournamentStatus: string;
    decklists: number;
    players?: TournamentPlayers | null;
    winners?: TournamentPlayers | null;
    roundNumbers?: TournamentPlayers | null;
    pokeDataLastUpdated: string;
    rk9link: string;
    createdAt: string;
    updatedAt: string;
};

export type TournamentDate = {
    __typename: 'TournamentDate';
    start: string;
    end: string;
};

export type TournamentPlayers = {
    __typename: 'TournamentPlayers';
    juniors: string;
    seniors: string;
    masters: string;
};

export type UpdateTournamentInput = {
    id: string;
    pokeDataId?: string | null;
    name?: string | null;
    date?: TournamentDateInput | null;
    tournamentStatus?: string | null;
    decklists?: number | null;
    players?: TournamentPlayersInput | null;
    winners?: TournamentPlayersInput | null;
    roundNumbers?: TournamentPlayersInput | null;
    pokeDataLastUpdated?: string | null;
    rk9link?: string | null;
};

export type DeleteTournamentInput = {
    id: string;
};

export type ModelTournamentFilterInput = {
    id?: ModelIDInput | null;
    pokeDataId?: ModelStringInput | null;
    name?: ModelStringInput | null;
    tournamentStatus?: ModelStringInput | null;
    decklists?: ModelIntInput | null;
    pokeDataLastUpdated?: ModelStringInput | null;
    rk9link?: ModelStringInput | null;
    createdAt?: ModelStringInput | null;
    updatedAt?: ModelStringInput | null;
    and?: Array<ModelTournamentFilterInput | null> | null;
    or?: Array<ModelTournamentFilterInput | null> | null;
    not?: ModelTournamentFilterInput | null;
};

export type ModelIDInput = {
    ne?: string | null;
    eq?: string | null;
    le?: string | null;
    lt?: string | null;
    ge?: string | null;
    gt?: string | null;
    contains?: string | null;
    notContains?: string | null;
    between?: Array<string | null> | null;
    beginsWith?: string | null;
    attributeExists?: boolean | null;
    attributeType?: ModelAttributeTypes | null;
    size?: ModelSizeInput | null;
};

export type ModelTournamentConnection = {
    __typename: 'ModelTournamentConnection';
    items: Array<Tournament | null>;
    nextToken?: string | null;
};

export type ModelSubscriptionTournamentFilterInput = {
    id?: ModelSubscriptionIDInput | null;
    pokeDataId?: ModelSubscriptionStringInput | null;
    name?: ModelSubscriptionStringInput | null;
    tournamentStatus?: ModelSubscriptionStringInput | null;
    decklists?: ModelSubscriptionIntInput | null;
    pokeDataLastUpdated?: ModelSubscriptionStringInput | null;
    rk9link?: ModelSubscriptionStringInput | null;
    createdAt?: ModelSubscriptionStringInput | null;
    updatedAt?: ModelSubscriptionStringInput | null;
    and?: Array<ModelSubscriptionTournamentFilterInput | null> | null;
    or?: Array<ModelSubscriptionTournamentFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
    ne?: string | null;
    eq?: string | null;
    le?: string | null;
    lt?: string | null;
    ge?: string | null;
    gt?: string | null;
    contains?: string | null;
    notContains?: string | null;
    between?: Array<string | null> | null;
    beginsWith?: string | null;
    in?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
    ne?: string | null;
    eq?: string | null;
    le?: string | null;
    lt?: string | null;
    ge?: string | null;
    gt?: string | null;
    contains?: string | null;
    notContains?: string | null;
    between?: Array<string | null> | null;
    beginsWith?: string | null;
    in?: Array<string | null> | null;
    notIn?: Array<string | null> | null;
};

export type ModelSubscriptionIntInput = {
    ne?: number | null;
    eq?: number | null;
    le?: number | null;
    lt?: number | null;
    ge?: number | null;
    gt?: number | null;
    between?: Array<number | null> | null;
    in?: Array<number | null> | null;
    notIn?: Array<number | null> | null;
};

export type CreateTournamentMutationVariables = {
    input: CreateTournamentInput;
    condition?: ModelTournamentConditionInput | null;
};

export type CreateTournamentMutation = {
    createTournament?: {
        __typename: 'Tournament';
        id: string;
        pokeDataId: string;
        name: string;
        date: {
            __typename: 'TournamentDate';
            start: string;
            end: string;
        };
        tournamentStatus: string;
        decklists: number;
        players?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        winners?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        roundNumbers?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        pokeDataLastUpdated: string;
        rk9link: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type UpdateTournamentMutationVariables = {
    input: UpdateTournamentInput;
    condition?: ModelTournamentConditionInput | null;
};

export type UpdateTournamentMutation = {
    updateTournament?: {
        __typename: 'Tournament';
        id: string;
        pokeDataId: string;
        name: string;
        date: {
            __typename: 'TournamentDate';
            start: string;
            end: string;
        };
        tournamentStatus: string;
        decklists: number;
        players?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        winners?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        roundNumbers?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        pokeDataLastUpdated: string;
        rk9link: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type DeleteTournamentMutationVariables = {
    input: DeleteTournamentInput;
    condition?: ModelTournamentConditionInput | null;
};

export type DeleteTournamentMutation = {
    deleteTournament?: {
        __typename: 'Tournament';
        id: string;
        pokeDataId: string;
        name: string;
        date: {
            __typename: 'TournamentDate';
            start: string;
            end: string;
        };
        tournamentStatus: string;
        decklists: number;
        players?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        winners?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        roundNumbers?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        pokeDataLastUpdated: string;
        rk9link: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type GetTournamentQueryVariables = {
    id: string;
};

export type GetTournamentQuery = {
    getTournament?: {
        __typename: 'Tournament';
        id: string;
        pokeDataId: string;
        name: string;
        date: {
            __typename: 'TournamentDate';
            start: string;
            end: string;
        };
        tournamentStatus: string;
        decklists: number;
        players?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        winners?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        roundNumbers?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        pokeDataLastUpdated: string;
        rk9link: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type ListTournamentsQueryVariables = {
    filter?: ModelTournamentFilterInput | null;
    limit?: number | null;
    nextToken?: string | null;
};

export type ListTournamentsQuery = {
    listTournaments?: {
        __typename: 'ModelTournamentConnection';
        items: Array<{
            __typename: 'Tournament';
            id: string;
            pokeDataId: string;
            name: string;
            tournamentStatus: string;
            decklists: number;
            pokeDataLastUpdated: string;
            rk9link: string;
            createdAt: string;
            updatedAt: string;
        } | null>;
        nextToken?: string | null;
    } | null;
};

export type OnCreateTournamentSubscriptionVariables = {
    filter?: ModelSubscriptionTournamentFilterInput | null;
};

export type OnCreateTournamentSubscription = {
    onCreateTournament?: {
        __typename: 'Tournament';
        id: string;
        pokeDataId: string;
        name: string;
        date: {
            __typename: 'TournamentDate';
            start: string;
            end: string;
        };
        tournamentStatus: string;
        decklists: number;
        players?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        winners?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        roundNumbers?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        pokeDataLastUpdated: string;
        rk9link: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type OnUpdateTournamentSubscriptionVariables = {
    filter?: ModelSubscriptionTournamentFilterInput | null;
};

export type OnUpdateTournamentSubscription = {
    onUpdateTournament?: {
        __typename: 'Tournament';
        id: string;
        pokeDataId: string;
        name: string;
        date: {
            __typename: 'TournamentDate';
            start: string;
            end: string;
        };
        tournamentStatus: string;
        decklists: number;
        players?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        winners?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        roundNumbers?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        pokeDataLastUpdated: string;
        rk9link: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};

export type OnDeleteTournamentSubscriptionVariables = {
    filter?: ModelSubscriptionTournamentFilterInput | null;
};

export type OnDeleteTournamentSubscription = {
    onDeleteTournament?: {
        __typename: 'Tournament';
        id: string;
        pokeDataId: string;
        name: string;
        date: {
            __typename: 'TournamentDate';
            start: string;
            end: string;
        };
        tournamentStatus: string;
        decklists: number;
        players?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        winners?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        roundNumbers?: {
            __typename: 'TournamentPlayers';
            juniors: string;
            seniors: string;
            masters: string;
        } | null;
        pokeDataLastUpdated: string;
        rk9link: string;
        createdAt: string;
        updatedAt: string;
    } | null;
};
