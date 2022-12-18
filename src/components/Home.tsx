import { useState } from "react"
import { Container } from "react-bootstrap"
import HexToRgb from "../utilities/HexToRGB"
import GuessDisplay from "./GuessDisplay"
import { GuessEntry } from "./GuessEntry"

export const Home = () => {

    const [guesses, setGuesses] = useState<Array<any>>([])
    const [correctAnswer, setCorrectAnswer] = useState({
        r: Math.round(Math.random() * 255),
        g: Math.round(Math.random() * 255),
        b: Math.round(Math.random() * 255),
    }
    )

    const recordGuess = (hexGuess: string) => {
        console.log(`The correct answer is: ${correctAnswer.r}, ${correctAnswer.g}, ${correctAnswer.b} `)
        const RGBGuess = HexToRgb(hexGuess)
        setGuesses([...guesses, RGBGuess])
    }

    return (
        <Container>
            <GuessEntry recordGuess={recordGuess} />
            <div className="d-flex gap-3">
                <GuessDisplay guesses={guesses} />
            </div>

        </Container>
    )
}