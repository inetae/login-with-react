import React, { createContext, useReducer, Reducer as ReactReducer } from 'react';
import Reducer from 'controllers/Reducer';
import { ActionType, State } from 'constants/interfaces';

interface Props {
    children: JSX.Element;
}

const initialState: State = {
    posts: [],
    error: null
};

const Store = ({ children }: Props) => {
    // @ts-ignore
    const [state, dispatch] = useReducer<ReactReducer<State, ActionType>>(Reducer, initialState);

    return (
        // @ts-ignore
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext<State>(initialState);
export default Store;