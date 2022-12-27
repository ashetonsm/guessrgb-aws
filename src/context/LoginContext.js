import { createContext, useReducer } from "react";
import loginReducer from "./LoginReducer";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const initialState = {
        isLoading: false,
    };

    const [state, dispatch] = useReducer(loginReducer, initialState);

    return (
        <LoginContext.Provider
            value={{
                ...state,
                dispatch,
            }}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginContext;