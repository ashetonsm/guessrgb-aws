import { Card, ListGroup } from "react-bootstrap";

export const GuessDisplayH = ({ games }: { games: any }) => {

    const returnGuesses = (input: any[]) => {
        var output = input.map((guess: { r: number, g: number, b: number, correct: Array<number> }) =>
            <div>
                <div>{guess.r}</div>
                <div>{guess.g}</div>
                <div>{guess.b}</div>
            </div>
        )

        return output;
    }

    var output = games.map((entry: { status: number, date: Date, guesses: Array<any> }, idx: number) =>
        <div key={idx} id={`guessHistory${idx}`} >
            <h1>{entry.date}</h1>
            <h2>{entry.status == 0 ? "LOST" : "WON"}</h2>

            {returnGuesses(entry.guesses)}
            <hr></hr>
        </div>
    )
    return (output)
}
