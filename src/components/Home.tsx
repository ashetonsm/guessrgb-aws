import { useState } from "react"
import { Container } from "react-bootstrap"
import HexToRgb from "../utilities/HexToRGB"
import { GuessEntry } from "./GuessEntry"

export const Home = () => {

    const [guesses, setGuesses] = useState<Array<any>>([])

    const recordGuess = (hexGuess: string) => {
        const RGBGuess = HexToRgb(hexGuess)
        setGuesses([...guesses, RGBGuess])
    }

    function displayGuessed() {
        var output = guesses.map((RGB, idx) =>

            <p key={idx}>
                <span className="px-1">{RGB.r}</span>
                <span className="px-1">{RGB.g}</span>
                <span className="px-1">{RGB.b}</span>
            </p>

        )
        return (output)
    }

    return (
        <Container>
            <GuessEntry recordGuess={recordGuess} />
            {displayGuessed()}

        </Container>
    )
}