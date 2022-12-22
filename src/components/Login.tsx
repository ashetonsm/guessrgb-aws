import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const Login = () => {

    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
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
        if (form.checkValidity() === false) {
            console.log(form.checkValidity());
            return e.stopPropagation();
        }

        console.log(form.checkValidity());

        const response = await fetch(`http://localhost:5000/api/login`,
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
            const date = new Date(data.session.cookie.expires);
            // Plus one day from the time the session was generated
            date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
            document.cookie = `username=${inputs.email}; expires=${date.toUTCString()}; path=${data.session.cookie.path}`;
            console.log(data)
            // console.log(new Date().toUTCString())
            // console.log(date.toUTCString())
            alert("Log in successful!");
        } else {
            console.log(data)
            alert("Log in unsuccessful.");
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
                />
            </Form.Group>
            <Button type="submit" onClick={handleSubmit}>Log in</Button>
        </Form>
    )
}