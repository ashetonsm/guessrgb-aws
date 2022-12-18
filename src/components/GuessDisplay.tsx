import { Card, ListGroup } from "react-bootstrap";

export const GuessDisplay = ({ guesses }: { guesses: any }) => {

    var output = guesses.map((RGB: { r: number; g: number; b: number; }, idx: number) =>

        <Card key={idx} className="text-center">
            <Card.Header as="h5" >Guess {idx + 1}</Card.Header>
            <ListGroup variant="flush" style={{ backgroundColor: `rgb(${RGB.r}, ${RGB.g}, ${RGB.b})` }}>
                <ListGroup.Item style={{ backgroundColor: "inherit" }}>
                    <span>{RGB.r}</span>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: "inherit" }}>
                    <span>{RGB.g}</span>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: "inherit" }}>
                    <span>{RGB.b}</span>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
    return (output)
}

export default GuessDisplay
