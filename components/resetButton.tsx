import GameContext from "@/context/GameContext"
import { delay } from "@/lib/delay"
import { useContext } from "react"
import { Button } from "react-bootstrap"

export const ResetButton = () => {

    const { dispatch, gamePlaying } = useContext(GameContext)

    /**
     * Resets all relevant game state values via dispatch
     */
    const resetGame = async () => {
        dispatch({ type: 'SET_GUESSES', payload: [] });
        dispatch({ type: 'SET_GAMEWON', payload: false });
        dispatch({ type: 'SET_RECORDED_RESULT', payload: false });
        dispatch({ type: 'SET_GAMEPLAYING', payload: true });
        // Delay generating the next correct answer so the box doesn't spoil it
        await delay(200);
        dispatch({
            type: 'SET_CORRECTANSWER', payload: {
                r: Math.round(Math.random() * 255),
                g: Math.round(Math.random() * 255),
                b: Math.round(Math.random() * 255)
            }
        });
    }

    return (
        <div className="text-center mt-2 mb-2">
            <Button
                className="mb-3"
                style={{ visibility: gamePlaying ? 'hidden' : 'visible' }}
                onClick={() => {
                    resetGame()
                }}>
                Play Again
            </Button>
        </div>
    )
}