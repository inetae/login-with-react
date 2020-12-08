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
    posts: Server[] | never[];
    error: null;
}

interface ErrorResponse {
    message: string;
}

export interface ActionType {
    type: string;
    payload: State;
}