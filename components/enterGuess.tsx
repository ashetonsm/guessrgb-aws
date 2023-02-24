import { useContext, useState } from "react"
import GameContext from "@/context/GameContext"
import { RecordGuess } from "@/components/recordGuess"
import { Button } from "react-bootstrap"

export const EnterGuess = () => {

    const { dispatch, gamePlaying, guesses, difficulty, correctAnswer } = useContext(GameContext)
    const [currentColor, setCurrentColor] = useState("#000000");

    return (
        <>
            <div id="colorPicker" className="mt-2 mb-2">
                <input
                    type="color"
                    onChange={(e) => {
                        setCurrentColor(e.target.value)
                    }}
                />
            </div>
            <div className="text-center mt-2 mb-2">
                <Button
                    disabled={!gamePlaying}
                    onClick={() => {
                        RecordGuess(currentColor, dispatch, guesses, difficulty, correctAnswer)
                    }}>Submit Guess</Button>
            </div>
        </>
    )
}

export default EnterGuess;
