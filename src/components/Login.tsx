import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import LoginContext from "../context/LoginContext";
import { ReCaptcha } from "./ReCaptcha";

export const Login = () => {

    const { dispatch } = useContext(LoginContext);

    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        rememberUser: "false",
        token: ''
    });

    const handleChange = (e: { target: { id: string; value: any; }; }) => {
        const { id, value } = e.target
        setInputs((inputs) => ({
            ...inputs,
            [id]: value,
        }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(inputs)
        setValidated(true);
        const form = e.currentTarget.parentElement;
        if (form.checkValidity() === false ||
            inputs.token === null ||
            inputs.token === '') {
            return e.stopPropagation();
        }
        var verifiedToken = false;

        verifiedToken = await verifyToken()
        console.log(verifiedToken)

        if (verifiedToken) {
            const request = await fetch(`http://localhost:5000/api/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(inputs)
                })

            const response = await request.json()
            console.log(response);
            if (response.status === 'success') {
                document.cookie = `userId=${response.session.userId}; expires=${new Date(response.session.cookie.expires).toUTCString()}; path=${response.session.cookie.path}`;
                dispatch({ type: 'SET_USERID', payload: response.session.userId });
            } else {
                alert("Sorry, we weren't able to log you in with that information!");
            }

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
        console.log(response);
        if (response.status === 'success') {
            return true
        } else {
            return false
        }
    }


    return (
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
                    onChange={handleChange} />
                <Form.Text>Please enter your email address.</Form.Text>
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
                <Form.Text>Please enter your password.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
                <Form.Check
                    type="checkbox"
                    id="rememberUser"
                    label="Remember me"
                    value={inputs.rememberUser}
                    onChange={(e) => {
                        const { id, value } = e.target
                        setInputs((inputs) => ({
                            ...inputs,
                            [id]: value === "false" ? "true" : "false",
                        }))
                    }}
                />
            </Form.Group>
            <ReCaptcha setInputs={setInputs} />
            <Button type="submit" onClick={handleSubmit}>Log in</Button>
        </Form>
    )
}