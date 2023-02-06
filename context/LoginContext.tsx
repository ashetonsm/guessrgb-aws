import { createContext, useReducer } from "react";
import loginReducer from "./LoginReducer";

const initialState = {
    isLoading: false,
    userId: null,
    fetchComplete: null,
    fetchedHistory: null,
    darkMode: false,
    darkModeChecked: false,
    dispatch: (action: Object) => {}
};

const LoginContext = createContext(initialState);

export const LoginProvider = (children: { children: any }) => {


    const [state, dispatch] = useReducer(loginReducer, initialState);

    return (
        <LoginContext.Provider
            value={{
                ...state,
                dispatch,
            }}>
            {children.children}
        </LoginContext.Provider>
    );
}

export default LoginContext;