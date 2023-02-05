import { useState } from "react"
import getRGBValue from '@/lib/hexToRGB'
import CheckGuess from "./checkGuess"

export const GuessEntry = () => {

    const gamePlaying = true;
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
                        recordGuess(currentColor)
                    }}>Submit Guess</button>
            </div>
        </>
    )
}

/**
 * Records a guess by creating a userAnswer with the RGB value and a "correct" array. 
 * All 1s = correct answer.
 * Ends the game after 5 turns (when guesses.length >= 4)
 * @param hexValue string
 */
const recordGuess = (hexValue: string) => {
    const difficulty = 25;
    const correctAnswer = {
        r: Math.round(Math.random() * 255),
        g: Math.round(Math.random() * 255),
        b: Math.round(Math.random() * 255)
    }

    const rgbValue = getRGBValue(hexValue)
    const userAnswer = {
        r: rgbValue!.r,
        g: rgbValue!.g,
        b: rgbValue!.b,
        correct: CheckGuess(correctAnswer, { r: rgbValue!.r, g: rgbValue!.g, b: rgbValue!.b }, difficulty)
    }

    var numCorrect = 0
    userAnswer.correct.forEach(element => {
        if (element === 1) { numCorrect++ }
    })
    if (numCorrect === 3) {
        // dispatch({ type: 'SET_GAMEWON', payload: true });
        // dispatch({ type: 'SET_GAMEPLAYING', payload: false });
    }

    // dispatch({ type: 'SET_GUESSES', payload: [...guesses, userAnswer] });
    // if (guesses.length >= 4) {
    //     dispatch({ type: 'SET_GAMEPLAYING', payload: false });
    // }
}

export default GuessEntry;
