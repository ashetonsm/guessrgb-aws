import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { InfoToast } from "@/components/infoToast";
import { Auth } from 'aws-amplify';
import Router from "next/router";

const Validate = () => {

    const [showInfoToast, setShowInfoToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("...");
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        authentication: "",
    });

    const redirectToHome = () => {
        Router.push("/")
    }

    /**
     * Changes the input values 
     * @param e The event and its relevant properties
     */
    const handleChange = (e: { target: { id: string; value: string; }; }) => {
        const { id, value } = e.target
        setInputs((inputs) => ({
            ...inputs,
            [id]: value,
        }))
    }

    /**
     * Checks the form's validity, applies styles, and registers a user.
     * @param e The event - needed for preventDefault
     * @returns setInfoToast(true)
     */
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setValidated(true);
        const form = e.currentTarget.parentElement;
        if (form.checkValidity() === false) {
            return e.stopPropagation();
        }

        try {
            await Auth.confirmSignUp(inputs.email, inputs.authentication)
            setToastMsg("Validation successful! You may now log in.");
            redirectToHome()
        } catch (err) {
            setToastMsg("Validation unsuccessful!");
        }
        return setShowInfoToast(true);
    }

    return (
        <>
            <InfoToast msg={toastMsg} show={showInfoToast ? "true" : "false"} onHide={() => setShowInfoToast(false)} />

            <Container>

                <Form noValidate validated={validated}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            id="email"
                            minLength={6}
                            maxLength={50}
                            value={inputs.email}
                            onChange={handleChange}
                            autoComplete="username"
                        />
                        <Form.Text>Please enter your email address.</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Authentication</Form.Label>
                        <Form.Control
                            required
                            id="authentication"
                            minLength={1}
                            value={inputs.authentication}
                            onChange={handleChange}
                        />
                        <Form.Text>
                            You should receive an email with your authentication code within 1-5 minutes.
                            Please enter your authentication code.
                        </Form.Text>
                    </Form.Group>
                    <Button type="submit" onClick={handleSubmit}>Validate</Button>
                </Form>
            </Container>

        </>

    )
}

export default Validate