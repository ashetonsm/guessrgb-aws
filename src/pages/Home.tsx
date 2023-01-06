import { useContext, useEffect } from "react"
import { Button, Container } from "react-bootstrap"
import GameContext from "../context/GameContext"
import HexToRgb from "../utilities/HexToRGB"
import { AnswerToast } from "../components/AnswerToast"
import CheckGuess from "../components/CheckGuess"
import GuessDisplay from "../components/GuessDisplay"
import { GuessEntry } from "../components/GuessEntry"
import LoginContext from "../context/LoginContext"

export const Home = () => {

    const { dispatch, gamePlaying, gameWon, correctAnswer, guesses, recordedResult } = useContext(GameContext);
    const { userId } = useContext(LoginContext);

    const recordResult = async () => {

        const result = {
            userId: userId,
            result: {
                status: gameWon ? 1 : 0,
                date: new Date().toUTCString(),
                guesses: guesses,
                answer: correctAnswer
            }
        }

        const response = await fetch(`http://localhost:5000/api/record`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result)
            }
        )
        const data = await response.json()
        if (data.status === "success") {
            console.log(data)
            return alert("Recorded result!");
        } else {
            console.log(data)
            return alert("Unable to record result.");
        }
    }

    useEffect(() => {
        if (!gamePlaying &&
            userId !== null &&
            recordedResult !== true) {
            recordResult();
            dispatch({ type: 'SET_RECORDED_RESULT', payload: true });
        }
    })

    const recordGuess = (hexValue: string) => {
        console.log(`The correct answer is: ${correctAnswer.r}, ${correctAnswer.g}, ${correctAnswer.b} `)
        const rgbValue = HexToRgb(hexValue)
        const userAnswer = {
            r: rgbValue!.r,
            g: rgbValue!.g,
            b: rgbValue!.b,
            correct: CheckGuess(correctAnswer, { r: rgbValue!.r, g: rgbValue!.g, b: rgbValue!.b })
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

    const resetGame = () => {
        dispatch({ type: 'SET_GUESSES', payload: [] });
        dispatch({
            type: 'SET_CORRECTANSWER', payload: {
                r: Math.round(Math.random() * 255),
                g: Math.round(Math.random() * 255),
                b: Math.round(Math.random() * 255)
            }
        });
        dispatch({ type: 'SET_GAMEWON', payload: false });
        dispatch({ type: 'SET_GAMEPLAYING', payload: true });
        dispatch({ type: 'SET_RECORDED_RESULT', payload: false });
    }

    return (
        <>
            <Container>
                {!gamePlaying && <AnswerToast correctAnswer={correctAnswer} />}
                <div className="d-flex justify-content-center">
                    <div className="flex-column text-center">
                        <h5>{gamePlaying ? "Choose a color:" : gameWon ? "You win!" : "You lose!"}</h5>
                        <GuessEntry recordGuess={recordGuess} gamePlaying={gamePlaying} />
                        <div className="mt-2 mb-2 px-2 ">
                            <Button
                                style={{ visibility: gamePlaying ? 'hidden' : 'visible' }}
                                onClick={() => {
                                    resetGame()
                                }}>
                                Play Again
                            </Button>
                        </div>
                        <div className="d-flex gap-3">
                            <GuessDisplay guesses={guesses} />
                        </div>
                    </div>
                </div>

            </Container>
        </>
    )
}