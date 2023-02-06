import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import LoginContext from "../context/LoginContext";
import { InfoToast } from "./InfoToast";

export const Login = () => {

    const { dispatch } = useContext(LoginContext);
    const [showInfoToast, setShowInfoToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("...");
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        rememberUser: "false",
    });

    /**
     * Changes the input values 
     * @param e The event and its relevant properties
     */
    const handleChange = (e: { target: { id: string; value: any; }; }) => {
        const { id, value } = e.target
        setInputs((inputs) => ({
            ...inputs,
            [id]: value,
        }))
    }

    /**
     * Checks the form's validity, applies styles, and logs the user in.
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
        if (response.status === 'success') {
            document.cookie = `userId=${response.session.userId}; expires=${new Date(response.session.cookie.expires).toUTCString()}; path=${response.session.cookie.path}`;
            dispatch({ type: 'SET_USERID', payload: response.session.userId });
            setToastMsg("Log in successful!");
        } else {
            setToastMsg("Sorry, we weren't able to log you in with that information!");
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
                <Button type="submit" onClick={handleSubmit}>Log in</Button>
            </Form>
        </>
    )
}