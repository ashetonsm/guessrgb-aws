import { Card, ListGroup } from "react-bootstrap";

export const GuessDisplayH = ({ games }: { games: any }) => {

    const returnGuesses = (input: any[]) => {
        var output = input.map((guess: { r: number, g: number, b: number, correct: Array<number> }, idx: number) =>

            <Card key={idx}
                style={{ minWidth: '5.5em' }}
            >
                <Card.Header as="h5" >Guess {idx + 1}</Card.Header>
                <ListGroup
                    className="guessContainer"
                    variant="flush"
                    style={{ backgroundColor: `rgb(${guess.r}, ${guess.g}, ${guess.b})` }}>
                    <ListGroup.Item style={{ backgroundColor: "inherit" }}>
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

    var output = games.map((entry: { status: number, date: Date, guesses: Array<any>, answer: { r: number; g: number; b: number }, difficulty: number }, idx: number) =>
        <Card key={idx}
            id={`guessHistory-${idx}`}
            className="mb-3"
        >
            <div className="row g-0">
                <div className="row g-0 gap-3 rounded-top historyHeader"
                    style={{ backgroundColor: `rgb(${entry.answer.r}, ${entry.answer.g}, ${entry.answer.b})` }}
                >

                    <div className="col text-center">
                        <p>R: {entry.answer.r}, G: {entry.answer.g}, B: {entry.answer.b}  </p>
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
                    className="text-center d-flex flex-wrap justify-content-center"
                    style={{ maxWidth: 'inherit' }}

                >
                    {returnGuesses(entry.guesses)}
                </Card.Body>
            </div>

        </Card>

    )
    return (output)
}
