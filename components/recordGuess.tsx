import getRGBValue from "@/lib/hexToRGB";
import CheckGuess from "./checkGuess";

/**
 * Records a guess by creating a userAnswer with the RGB value and a "correct" array. 
 * All 1s = correct answer.
 * Ends the game after 5 turns (when guesses.length >= 4)
 * @param hexValue string
*/
export const RecordGuess = (hexValue: string,
    dispatch: { (action: Object): void; (arg0: { type: string; payload: any; }): void; },
    guesses: any[],
    difficulty: number,
    correctAnswer: { r: number; g: number; b: number; }) => {

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
        dispatch({ type: 'SET_GAMEWON', payload: true });
        dispatch({ type: 'SET_GAMEPLAYING', payload: false });
    }

    dispatch({ type: 'SET_GUESSES', payload: [...guesses, userAnswer] });
    if (guesses.length >= 4) {
        dispatch({ type: 'SET_GAMEPLAYING', payload: false });
    }
}
