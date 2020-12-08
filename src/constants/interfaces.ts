export interface LoginDetails {
    username: string;
    password: string;
    token?: string;
}

export interface Server {
    name: string;
    distance: string;
}

export interface State {
    data: Server[] | never[];
    error: null;
}

export interface ActionType {
    type: string;
    payload: State;
}