import Router from "next/router";
import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { InfoToast } from "@/components/infoToast";
import { Auth } from 'aws-amplify';
import GameContext from "@/context/GameContext";

export const Login = () => {
    const { dispatch } = useContext(GameContext);
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

    const redirectToHome = () => {
        const { pathname } = Router;
        if (pathname === "/auth") { Router.push("/") }
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

        try {
            await Auth.signIn(inputs.email, inputs.password);
            dispatch({ type: 'SET_IS_AUTHENTICATED', payload: true })
            setToastMsg("Log in successful!");
        } catch (err) {
            setToastMsg("Sorry, we weren't able to log you in!");
            console.log(err);
        }
        console.log('Success!');
        redirectToHome();
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
                        autoComplete="username" />
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
                        onChange={handleChange}
                        autoComplete="current-password" />
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
                <Button className="mb-3" type="submit" onClick={handleSubmit}>Log in</Button>
            </Form>

        </>
    )
}