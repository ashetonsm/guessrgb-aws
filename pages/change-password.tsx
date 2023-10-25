import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { InfoToast } from "@/components/infoToast";
import { Auth, withSSRContext } from 'aws-amplify';
import Router from "next/router";
import { GetServerSideProps } from "next";
import GameContext from "@/context/GameContext";

const ChangePassword = ({ user }: any) => {

    const { dispatch, darkMode, isAuthenticated } = useContext(GameContext);
    const [showInfoToast, setShowInfoToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("...");
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({
        oldPassword: "",
        newPassword: "",
    });

    useEffect(() => {
        if (user && !isAuthenticated) {
            dispatch({ type: 'SET_IS_AUTHENTICATED', payload: true })
        }
    })

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
            const user = await Auth.currentAuthenticatedUser();
            await Auth.changePassword(user, inputs.oldPassword, inputs.newPassword);
            setToastMsg("Password changed!");
            redirectToHome()
        } catch (err) {
            setToastMsg("Error changing password.");
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

    return (
        <>
            <InfoToast msg={toastMsg} show={showInfoToast ? "true" : "false"} onHide={() => setShowInfoToast(false)} />

            <Container>
                <Col className="mb-3 text-center">
                    <h2>Change Password</h2>
                </Col>

                <Form noValidate validated={validated}>
                    <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            id="oldPassword"
                            minLength={8}
                            maxLength={12}
                            value={inputs.oldPassword}
                            onChange={handleChange}
                            autoComplete="password"
                        />
                        <Form.Text>Please enter your current password.</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            id="newPassword"
                            minLength={8}
                            maxLength={12}
                            value={inputs.newPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                        <Form.Text>
                            Please enter a new password (8-12 characters).
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
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        };
    }

    return {
        props: {
            user: JSON.parse(JSON.stringify(user))
        }
    };
};

export default ChangePassword