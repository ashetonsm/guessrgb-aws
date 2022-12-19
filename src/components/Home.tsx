import { useState } from "react"
import { Button, Container } from "react-bootstrap"
import HexToRgb from "../utilities/HexToRGB"
import CheckGuess from "./CheckGuess"
import GuessDisplay from "./GuessDisplay"
import { GuessEntry } from "./GuessEntry"
import { Menu } from "./Menu"

export const Home = () => {

    const [gamePlaying, setGamePlaying] = useState(true)
    const [gameWon, setGameWon] = useState(false)
    const [guesses, setGuesses] = useState<Array<any>>([])
    const [correctAnswer, setCorrectAnswer] = useState({
        r: Math.round(Math.random() * 255),
        g: Math.round(Math.random() * 255),
        b: Math.round(Math.random() * 255)
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
            console.log("You win!")
            setGameWon(true)
            setGamePlaying(false)
        }

        setGuesses([...guesses, userAnswer])
        if (guesses.length >= 4) {
            setGamePlaying(false)
        }
    }

    const resetGame = () => {
        setGuesses([])
        setCorrectAnswer({
            r: Math.round(Math.random() * 255),
            g: Math.round(Math.random() * 255),
            b: Math.round(Math.random() * 255)
        })
        setGameWon(false)
        setGamePlaying(true)
    }

    return (
        <>
            <Menu />

            <Container>
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