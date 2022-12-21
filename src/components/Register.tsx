import { useState } from "react";
import { Button, Form } from "react-bootstrap"

export const Register = () => {

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
        if (data.status == "success") {
            alert("Registration successful!");
        } else {
            alert("Registration unsuccessful.");
        }
    }

    return (
        <Form validated>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
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
    )
}