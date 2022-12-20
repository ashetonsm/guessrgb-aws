import { useState } from "react";
import { Button, Form } from "react-bootstrap"

export const Login = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e: { target: { id: string; value: string; }; }) => {
        const { id, value } = e.target
        setInputs((inputs) => ({
            ...inputs,
            [id]: value,
        }))
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(inputs);
    }

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" id="username" value={inputs.username} onChange={handleChange} />
                <Form.Text>Please enter your username.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" id="password" value={inputs.password} onChange={handleChange} />
                <Form.Text>Please enter your password.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    id="rememberUser"
                    label="Remember me"
                />
            </Form.Group>
            <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}