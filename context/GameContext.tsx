import { createContext, useReducer } from "react";
import gameReducer from "./GameReducer";

const initialState = {
    gamePlaying: true,
    gameWon: false,
    recordedResult: false,
    guesses: [],
    difficulty: 25,
    correctAnswer: {
        r: Math.round(Math.random() * 255),
        g: Math.round(Math.random() * 255),
        b: Math.round(Math.random() * 255)
    },
    darkMode: false,
    dispatch: (action: Object) => {}
};
const GameContext = createContext(initialState);

export const GameProvider = (children: { children: any }) => {

    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider
            value={{
                ...state,
                dispatch,
            }}>
            {children.children}
        </GameContext.Provider>
    );
}

export default GameContext;