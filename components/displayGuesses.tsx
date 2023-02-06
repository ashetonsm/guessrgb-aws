import GameContext from "@/context/GameContext";
import { useContext } from "react";
import { Card, ListGroup } from "react-bootstrap";

export const DisplayGuesses = () => {
    const { guesses } = useContext(GameContext);

    var output = guesses.map((RGB: { r: number; g: number; b: number; correct: Array<number> }, idx: number) =>

        <Card
            key={idx}
            className="text-center slideDown d-flex flex-wrap"
            style={{
                minWidth: '1em'
            }}
        >
            <Card.Header as="h5"
                style={{
                    color: "#000",
                    backgroundColor: `rgba(${RGB.r}, ${RGB.g}, ${RGB.b}, 0.5)`,
                    borderColor: `rgb(${RGB.r}, ${RGB.g}, ${RGB.b})`
                }}>
                Guess {idx + 1}
            </Card.Header>
            <ListGroup
                id={`guessContainer-${idx}`}
                variant="flush"
                style={{ backgroundColor: `rgb(${RGB.r}, ${RGB.g}, ${RGB.b})` }}>
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
    return (
        <>
            {output ? output : null}
        </>
    )
}

export default DisplayGuesses
