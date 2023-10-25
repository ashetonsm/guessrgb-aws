import { Card, ListGroup } from "react-bootstrap";

export const GuessDisplayH = ({ games }: { games: any }) => {

    /**
     * Turns the user's guesses for a game into cards.
     * @param input The array of guesses
     * @returns An array of Card
     */
    const returnGuesses = (input: any) => {
        var output = input.map((guess: { r: number, g: number, b: number, correct: Array<number> }, idx: number) =>

            <Card key={idx}
                style={{
                    minWidth: '5.5em'
                }}
            >
                <Card.Header as="h5"
                    style={{
                        color: "#000",
                        backgroundColor: `rgba(${guess.r}, ${guess.g}, ${guess.b}, 0.5)`,
                        borderColor: `rgb(${guess.r}, ${guess.g}, ${guess.b})`
                    }}>Guess {idx + 1}</Card.Header>
                <ListGroup
                    className="guessContainer"
                    variant="flush"
                    style={{ backgroundColor: `rgb(${guess.r}, ${guess.g}, ${guess.b})` }}>
                    <ListGroup.Item
                        style={{ backgroundColor: "inherit" }}>
                        <span style={{ color: guess.correct[0] === 1 ? '#9dff00' : '#FFF' }}>
                            {guess.r}
                        </span>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: "inherit" }}>
                        <span style={{ color: guess.correct[1] === 1 ? '#9dff00' : '#FFF' }}>
                            {guess.g}
                        </span>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: "inherit" }}>
                        <span style={{ color: guess.correct[2] === 1 ? '#9dff00' : '#FFF' }}>
                            {guess.b}
                        </span>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        )
        return output;
    }

    /**
     * Converts numerical difficulty to text value
     * @param input number
     * @returns A div with the text difficulty value
     */
    const returnDifficulty = (input: number) => {
        var textDifficulty;

        switch (input) {
            case 50:
                textDifficulty = "Easy"
                break;
            case 25:
                textDifficulty = "Medium"
                break;
            case 5:
                textDifficulty = "Hard"
                break;
            default:
                textDifficulty = "N/A"
                break;
        }

        return <div className="col text-center"><p>{textDifficulty}</p></div>
    }

    var output = games.map((entry: { status: number, date: Date, guesses: string, answer: string, difficulty: number }, idx: number) =>
        <Card key={idx}
            id={`guessHistory-${idx}`}
            className="mb-3"
            style={{ backgroundColor: "#ff000000", borderColor: `rgb(${JSON.parse(entry.answer).r}, ${JSON.parse(entry.answer).g}, ${JSON.parse(entry.answer).b})` }}>
            <div className="row g-0">
                <div className="row g-0 gap-3 rounded-top historyHeader"
                    style={{ backgroundColor: `rgb(${JSON.parse(entry.answer).r}, ${JSON.parse(entry.answer).g}, ${JSON.parse(entry.answer).b})` }}>
                    <div className="col text-center">
                        <p>R: {JSON.parse(entry.answer).r}, G: {JSON.parse(entry.answer).g}, B: {JSON.parse(entry.answer).b}  </p>
                    </div>
                    <div className="col text-center">
                        <p>{new Date(entry.date).toLocaleDateString()}</p>
                    </div>
                    <div className="col text-center">
                        <p>{entry.status === 0 ? "Lost" : "Won"}</p>
                    </div>
                    {returnDifficulty(entry.difficulty)}
                </div>

                <Card.Body
                    className="text-center d-flex flex-wrap justify-content-center gap-2"
                    style={{ maxWidth: 'inherit' }}>
                    {returnGuesses(JSON.parse(entry.guesses))}
                </Card.Body>
            </div>

        </Card>
    )
    return (output)
}
