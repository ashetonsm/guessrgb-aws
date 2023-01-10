import { createContext, useReducer } from "react";
import gameReducer from "./GameReducer";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
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
        }
    };

    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider
            value={{
                ...state,
                dispatch,
            }}>
            {children}
        </GameContext.Provider>
    );
}

export default GameContext;