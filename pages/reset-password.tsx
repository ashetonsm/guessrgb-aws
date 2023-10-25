import { useContext, useState, useEffect } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { InfoToast } from "@/components/infoToast";
import { Auth, withSSRContext } from 'aws-amplify';
import Router from "next/router";
import GameContext from "@/context/GameContext";
import { GetServerSideProps } from "next";

const ResetPassword = ({ user }: any) => {

    const { dispatch, darkMode, isAuthenticated } = useContext(GameContext);
    const [showInfoToast, setShowInfoToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("...");
    const [emailValidated, setEmailValidated] = useState(false);
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({
        accountEmail: "",
        email: "",
        authentication: "",
        password: "",
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
        const form = e.currentTarget.parentElement.parentElement;
        if (form.checkValidity() === false) {
            return e.stopPropagation();
        }

        try {
            await Auth.forgotPasswordSubmit(inputs.email, inputs.authentication, inputs.password)
            setToastMsg("Validation successful! You may now log in.");
            redirectToHome()
        } catch (err) {
            setToastMsg("Validation unsuccessful.");
        }
        return setShowInfoToast(true);
    }

    /**
     * Checks the form's validity, applies styles, and registers a user.
     * @param e The event - needed for preventDefault
     * @returns setInfoToast(true)
     */
    const handleCode = async (e: any) => {
        e.preventDefault();
        setEmailValidated(true);
        const form = e.currentTarget.parentElement.parentElement;
        console.log(form)
        if (form.checkValidity() === false) {
            return e.stopPropagation();
        }

        try {
            await Auth.forgotPassword(inputs.accountEmail)
            setToastMsg("Validation code sent.");
        } catch (err) {
            setToastMsg("No account found!");
        }
        return setShowInfoToast(true);
    }

    /**
     * Toggles dark mode
     */
    useEffect(() => {
        const appBG = document.getElementById('__next')

        // Dark mode was already set on load
        if (window.localStorage.getItem("darkMode")) {
            // Update the state to match
            dispatch({ type: 'SET_DARK_MODE', payload: true })
            appBG?.classList.add('darkMode')
        } else {
            if (darkMode === true) {
                appBG?.classList.add('darkMode')
                window.localStorage.setItem('darkMode', 'true')

            } else {
                appBG?.classList.remove('darkMode')
                window.localStorage.removeItem('darkMode')
            }
        }

    }, [darkMode])

    useEffect(() => {
        if (user && !isAuthenticated) {
            dispatch({ type: 'SET_IS_AUTHENTICATED', payload: true })
        }
    })

    return (
        <>
            <InfoToast msg={toastMsg} show={showInfoToast ? "true" : "false"} onHide={() => setShowInfoToast(false)} />

            <Container>
                <Col className="mb-3 text-center">
                    <h2>Reset Password</h2>
                </Col>

                <Form noValidate validated={emailValidated}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            id="accountEmail"
                            minLength={6}
                            maxLength={50}
                            value={inputs.accountEmail}
                            onChange={handleChange}
                            autoComplete="username"
                        />
                        <Form.Text>
                            Please enter the email address associated with your account.
                            If an account exists, you will receive an email with your authentication code
                            within 1-5 minutes.
                        </Form.Text>
                    </Form.Group>
                    <Col className="mb-3 text-center">
                        <Button type="submit" onClick={handleCode}>Get Code</Button>
                    </Col>
                </Form>


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
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            id="password"
                            minLength={8}
                            maxLength={12}
                            value={inputs.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                        <Form.Text>
                            Please enter a password (8-12 characters).
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Authentication Code</Form.Label>
                        <Form.Control
                            required
                            id="authentication"
                            minLength={1}
                            value={inputs.authentication}
                            onChange={handleChange}
                        />
                        <Form.Text>
                            Please enter your authentication code.
                        </Form.Text>
                    </Form.Group>
                    <Col className="mb-3 text-center">
                        <Button type="submit" onClick={handleSubmit}>Change Password</Button>
                    </Col>
                </Form>
            </Container>

        </>

    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const { Auth } = withSSRContext({ req });
    var user = null;
    try {
        user = await Auth.currentAuthenticatedUser()
    } catch (err) {
        console.log(err)
    }

    return {
        props: {
            user: JSON.parse(JSON.stringify(user))
        }
    };
};

export default ResetPassword
