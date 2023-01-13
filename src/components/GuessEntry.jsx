import { useState } from "react"
import Button from "react-bootstrap/esm/Button"

export const GuessEntry = ({ recordGuess, gamePlaying }) => {

    const [currentColor, setCurrentColor] = useState("#000000")

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
                        recordGuess(currentColor)
                    }}>Submit Guess</Button>
            </div>
        </>
    )
}

export default GuessEntry;
