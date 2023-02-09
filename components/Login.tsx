import { signIn, signOut, useSession } from "next-auth/react";
import Router from "next/router";
import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import LoginContext from "../context/LoginContext";
import LoadingDots from "./icons/loading-dots";
import { InfoToast } from "./InfoToast";

export const Login = () => {

    const { dispatch } = useContext(LoginContext);
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
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

        const res: any = await signIn("credentials", {
            email: inputs.email,
            password: inputs.password,
            redirect: false,
            callbackUrl: `${window.location.origin}`,
        });

        if (res.error) {
            setToastMsg("Sorry, we weren't able to log you in!");
        } else {
            // dispatch({ type: 'SET_USERID', payload: res.session.userId });
            setToastMsg("Log in successful!");
        }
        console.log(res)
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

            {status !== 'loading' &&
                (session?.user ?
                    <div>
                        Hi, {session.user.name} ({session.user.email})!
                    </div> : (
                        <Button
                            disabled={loading}
                            onClick={() => {
                                setLoading(true);
                                signIn('github', { callbackUrl: `/` });
                            }}
                            className={`${loading
                                ? 'bg-gray-200 border-gray-300'
                                : 'bg-black hover:bg-white border-black'
                                } w-36 h-8 py-1 text-white hover:text-black border rounded-md text-sm transition-all`}
                        >
                            {loading ? <LoadingDots color="gray" /> : 'Log in with GitHub'}
                        </Button>
                    ))}

        </>
    )
}