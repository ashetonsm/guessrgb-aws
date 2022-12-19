import { Card, ListGroup } from "react-bootstrap";

export const GuessDisplay = ({ guesses }: { guesses: any }) => {

    var output = guesses.map((RGB: { r: number; g: number; b: number; correct: Array<number> }, idx: number) =>

        <Card key={idx} className="text-center slideDown">
            <Card.Header as="h5" >Guess {idx + 1}</Card.Header>
            <ListGroup id="guessContainer" variant="flush" style={{ backgroundColor: `rgb(${RGB.r}, ${RGB.g}, ${RGB.b})` }}>
                <ListGroup.Item style={{ backgroundColor: "inherit" }}>
                    <span style={{ color: RGB.correct[0] === 1 ? '#9dff00' : '#FFF' }}>
                        {RGB.r}
                    </span>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: "inherit" }}>
                    <span style={{ color: RGB.correct[1] === 1 ? '#9dff00' : '#FFF' }}>
                        {RGB.g}
                    </span>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: "inherit" }}>
                    <span style={{ color: RGB.correct[2] === 1 ? '#9dff00' : '#FFF' }}>
                        {RGB.b}
                    </span>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
    return (output)
}

export default GuessDisplay
