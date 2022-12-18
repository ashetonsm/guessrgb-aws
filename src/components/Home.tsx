import { useState } from "react"
import { Container } from "react-bootstrap"
import HexToRgb from "../utilities/HexToRGB"
import GuessDisplay from "./GuessDisplay"
import { GuessEntry } from "./GuessEntry"

export const Home = () => {

    const [guesses, setGuesses] = useState<Array<any>>([])

    const recordGuess = (hexGuess: string) => {
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