import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { InfoToast } from "./InfoToast";

export const Register = () => {

    const [showInfoToast, setShowInfoToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("...");
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

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

        const response = await fetch(`/api/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            }
        )
        const data = await response.json()
        if (data.status === "success") {
            setToastMsg("Registration successful!");
        } else {
            setToastMsg("Registration unsuccessful!");
        }
        return setShowInfoToast(true);
    }

    return (
        <>
            <InfoToast msg={toastMsg} show={showInfoToast ? "true" : "false"} onHide={() => setShowInfoToast(false)} />

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
                    />
                    <Form.Text>Please enter an email address.</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        id="password"
                        minLength={8}
                        maxLength={12}
                        value={inputs.password}
                        onChange={handleChange} />
                    <Form.Text>Please enter a password (8-12 characters).</Form.Text>
                </Form.Group>
                <Button type="submit" onClick={handleSubmit}>Register</Button>
            </Form>
        </>

    )
}