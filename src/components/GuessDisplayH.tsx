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

    var output = games.map((entry: { status: number, date: Date, guesses: Array<any>, answer: { r: number; g: number; b: number } }, idx: number) =>
        <Card key={idx}
            id={`guessHistory${idx}`}
            className="mb-3"
            style={{ maxWidth: '50vw' }}
        >
            <div className="row g-0">

                <div className="col-md-4">
                    <svg
                        className="img-fluid rounded-start"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Placeholder: Image"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false">
                        <rect
                            width="100%" height="100%"
                            fill={`rgb(${entry.answer.r}, ${entry.answer.g}, ${entry.answer.b})`}></rect>
                        <text
                            x="10%" y="50%"
                            fill="#dee2e6"
                            dy=".3em">R: {entry.answer.r}, G: {entry.answer.g}, B: {entry.answer.b}</text>
                    </svg>
                </div>
                <div className="col text-center">
                    <span >{entry.date}</span>
                </div>

                <Card.Body>
                    <Card.Subtitle>{entry.status == 0 ? "LOST" : "WON"}</Card.Subtitle>
                    <Card.Text>
                        {returnGuesses(entry.guesses)}
                    </Card.Text>
                </Card.Body>
            </div>

        </Card>

    )
    return (output)
}
