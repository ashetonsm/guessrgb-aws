import { DetailedHTMLProps, HTMLAttributes, RefObject, ReactNode } from "react"
import { Button, Modal, ModalProps } from "react-bootstrap"
import { Omit, BsPrefixProps } from "react-bootstrap/esm/helpers"

export const InfoBox = (props: JSX.IntrinsicAttributes & Omit<Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof HTMLAttributes<HTMLDivElement>> & { ref?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined }, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: ReactNode }) => {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    How to Play:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Welcome to guessRGB! The goal is to guess the correct color within 5 turns.
                    Use the color picker to select a color, then press "Submit Guess". The game ends
                    when the correct color is guessed or you run out of tries.</p>
                <p>Click the "MENU" button to log in or create an account.
                    Logged in accounts can view their guess history on the profile page.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>


    )
}