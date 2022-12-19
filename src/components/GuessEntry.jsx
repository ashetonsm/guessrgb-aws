import { useState } from "react"
import Button from "react-bootstrap/esm/Button"

export const GuessEntry = ({ recordGuess, gamePlaying }) => {

    const [currentColor, setCurrentColor] = useState("#000000")

    return (
        <div className="mt-2 mb-2 px-2">
            <input
                id="colorPicker"
                type="color"
                onChange={(e) => {
                    setCurrentColor(e.target.value)
                }}
            />
            <div className="text-center">
                <Button
                    disabled={!gamePlaying}
                    onClick={() => {
                        console.log("Current color: " + currentColor)
                        recordGuess(currentColor)
                    }}>Submit Guess</Button>
            </div>
        </div>
    )
}

export default GuessEntry;
