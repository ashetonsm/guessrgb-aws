import { useContext, useState } from "react"
import GameContext from "@/context/GameContext"
import { RecordGuess } from "./recordGuess"

export const EnterGuess = () => {

    const { gamePlaying } = useContext(GameContext)
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
                <button
                    disabled={!gamePlaying}
                    onClick={() => {
                        RecordGuess(currentColor)
                    }}>Submit Guess</button>
            </div>
        </>
    )
}

export default EnterGuess;
