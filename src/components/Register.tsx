import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { InfoToast } from "./InfoToast";
import { ReCaptcha } from "./ReCaptcha";

export const Register = () => {

    const [showInfoToast, setShowInfoToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("...");
    const [validated, setValidated] = useState(false);
    const [recaptchaWarning, setRecaptchaWarning] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        token: ''
    });

    const handleChange = (e: { target: { id: string; value: string; }; }) => {
        const { id, value } = e.target
        setInputs((inputs) => ({
            ...inputs,
            [id]: value,
        }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setValidated(true);
        const form = e.currentTarget.parentElement;
        if (form.checkValidity() === false ||
            inputs.token === null ||
            inputs.token === '') {
            if (inputs.token === null || inputs.token === '') {
                setRecaptchaWarning(true);
            } else {
                setRecaptchaWarning(false);
            }
            return e.stopPropagation();
        }
        var verifiedToken = false;

        verifiedToken = await verifyToken()

        if (verifiedToken) {
            const response = await fetch(`http://localhost:5000/api/register`,
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
    }

    const verifyToken = async () => {
        const request = await fetch(`http://localhost:5000/api/verify`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ token: inputs.token })
            })

        const response = await request.json()
        if (response.status === 'success') {
            return true
        } else {
            return false
        }
    }

    return (
        <>
            <InfoToast msg={toastMsg} show={showInfoToast} onHide={() => setShowInfoToast(false)} />

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
                <div id="reCaptcha-box"
                    className="mb-3"
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        backgroundColor: `${recaptchaWarning ? '#dc3545' : validated ? '#198754' : 'transparent'}`,
                        borderRadius: 5,
                        width: 'fit-content'
                    }}>
                    <ReCaptcha setInputs={setInputs} />
                </div>
                <Button type="submit" onClick={handleSubmit}>Register</Button>
            </Form>
        </>

    )
}