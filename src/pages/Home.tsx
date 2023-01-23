import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import GameContext from "../context/GameContext"
import HexToRgb from "../utilities/HexToRGB"
import { AnswerToast } from "../components/AnswerToast"
import CheckGuess from "../components/CheckGuess"
import GuessDisplay from "../components/GuessDisplay"
import { GuessEntry } from "../components/GuessEntry"
import LoginContext from "../context/LoginContext"
import { Delay } from "../utilities/Delay"
import { InfoToast } from "../components/InfoToast"

export const Home = () => {

    const { dispatch, gamePlaying, gameWon, correctAnswer, guesses, recordedResult, difficulty } = useContext(GameContext);
    const [showInfoToast, setShowInfoToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("...");
    const { userId } = useContext(LoginContext);

    /**
     * Records a logged in user's game result to their history.
     * @returns A new toastMsg string
     */
    const recordResult = async () => {

        const result = {
            userId: userId,
            result: {
                status: gameWon ? 1 : 0,
                date: new Date().toUTCString(),
                guesses: guesses,
                answer: correctAnswer,
                difficulty: difficulty
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
        setShowInfoToast(true)
        if (data.status === "success") {
            return setToastMsg("Game saved to history!");
        } else {
            return setToastMsg("Unable to save game to history!");
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

    const resetGame = async () => {
        dispatch({ type: 'SET_GUESSES', payload: [] });
        dispatch({ type: 'SET_GAMEWON', payload: false });
        dispatch({ type: 'SET_RECORDED_RESULT', payload: false });
        dispatch({ type: 'SET_GAMEPLAYING', payload: true });
        // Delay generating the next correct answer so the box doesn't spoil it
        await Delay(200);
        dispatch({
            type: 'SET_CORRECTANSWER', payload: {
                r: Math.round(Math.random() * 255),
                g: Math.round(Math.random() * 255),
                b: Math.round(Math.random() * 255)
            }
        });
    }

    return (
        <Container>
            <AnswerToast />
            <InfoToast msg={toastMsg} show={showInfoToast} onHide={() => setShowInfoToast(false)} />
            <div className="row text-center d-flex flex-wrap justify-content-center">
                <Row>
                    <Col>
                        <h5>{gamePlaying ? "Choose a color:" : gameWon ? "You win!" : "You lose!"}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <GuessEntry recordGuess={recordGuess} gamePlaying={gamePlaying} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            className="mb-3"
                            style={{ visibility: gamePlaying ? 'hidden' : 'visible' }}
                            onClick={() => {
                                resetGame()
                            }}>
                            Play Again
                        </Button>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col
                    className="d-flex flex-wrap justify-content-center gap-3 mb-3">
                    <GuessDisplay guesses={guesses} />
                </Col>
            </Row>

        </Container>
    )
}