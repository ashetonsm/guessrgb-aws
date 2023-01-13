import { DetailedHTMLProps, HTMLAttributes, RefObject, ReactNode, useContext } from "react"
import { Button, ButtonGroup, Modal, ModalProps, ToggleButton } from "react-bootstrap"
import { Omit, BsPrefixProps } from "react-bootstrap/esm/helpers"
import GameContext from "../context/GameContext"

export const Settings = (props: JSX.IntrinsicAttributes & Omit<Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof HTMLAttributes<HTMLDivElement>> & { ref?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined }, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: ReactNode }) => {

    const { dispatch, difficulty } = useContext(GameContext)

    const difficulties = [
        { name: 'Easy', value: 50 },
        { name: 'Medium', value: 25 },
        { name: 'Hard', value: 5 },
    ];

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Settings:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Difficulty Level: </h3>
                <p>Changes the tolerance for a correct answer:</p>
                <ul>
                    <li>Easy: within 50pts</li>
                    <li>Medium: within 25pts</li>
                    <li>Hard: within 5pts</li>
                </ul>
                <ButtonGroup>
                    {difficulties.map((level, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`level-${idx}`}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={level.value}
                            checked={difficulty === level.value}
                            onChange={(e) => dispatch({ type: 'SET_DIFFICULTY', payload: parseInt(e.currentTarget.value) })}
                        >
                            {level.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>


    )
}