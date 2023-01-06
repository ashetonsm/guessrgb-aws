import Offcanvas from 'react-bootstrap/Offcanvas'
import { useContext, useEffect, useState } from "react"
import { Login } from './Login'
import { Register } from './Register'
import { Button, Container, Nav } from 'react-bootstrap'
import { Link, Navigate, Outlet } from 'react-router-dom'
import LoginContext from '../context/LoginContext'

export const Menu = (loggedIn: {loggedIn: boolean}) => {

    const { dispatch, userId } = useContext(LoginContext);

    const [showMenu, setShowMenu] = useState(false)
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)

    const checkAuth = async () => {
        var authId = null;

        if (userId == null) {
            // Check if there's a cookie from a previous login
            const cookieId = document.cookie.split("=")[1];
            if (cookieId !== undefined) {
                // Use the cookie as the context userId
                authId = cookieId;
                console.log("There is a login cookie");
                dispatch({ type: 'SET_USERID', payload: cookieId });
            } else {
                // No cookie found
                console.log("There is NOT a login cookie.");
            }
        } else {
            // UserId has already been set. User is already logged in.
            authId = userId;
            dispatch({ type: 'SET_USERID', payload: authId });
        }

        // Get session from cookie
        /*
        if (userId == null && authId !== null) {
            const request = await fetch(`http://localhost:5000/api/auth`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: authId })
                })
            const response = await request.json()
            if (response.userId !== null) {
                console.log("User is logged in from session.");
                dispatch({ type: 'SET_USERID', payload: response.userId });
            } else {
                console.log("User is NOT logged in from session.");
                setLoggedIn(false)
            }
        }
        */
    }


    const logOut = async () => {
        await fetch(`http://localhost:5000/api/logout`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    dispatch({ type: 'SET_USERID', payload: null });
                    dispatch({ type: 'SET_FETCHED_HISTORY', payload: null });
                    return dispatch({ type: 'SET_FETCH_COMPLETE', payload: false });
                } else {
                    alert("Log out unsuccessful.");
                }
            })
    }

    useEffect(() => {
        checkAuth();
    }, [dispatch])

    return (
        <>
            <h1 className="text-center">guessRGB</h1>
            <Button onClick={() => setShowMenu(true)}
                style={{
                    cursor: 'pointer',
                    position: 'sticky',
                    left: '2vw'
                }}>MENU</Button>

            <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} className="d-flex justify-content-center">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='flex-row text-center'>
                    <Nav variant="pills" className='d-inline' justify defaultActiveKey={loggedIn.loggedIn ? undefined : "login"}>
                        <Nav.Item>
                            <Link to={"/guessRGB"} className="nav-link">Home</Link>
                        </Nav.Item>
                        {loggedIn.loggedIn ?
                            <div>
                                <Nav.Item>
                                    <Link to={"/guessRGB/profile"} className="nav-link">Profile</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={() => logOut()}>Log out</Nav.Link>
                                </Nav.Item>
                            </div>
                            :
                            <div>
                                <Nav.Item>
                                    <Nav.Link eventKey="login" onClick={() => {
                                        setShowRegister(false)
                                        setShowLogin(true)
                                    }}>Log in</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="register" onClick={() => {
                                        setShowLogin(false)
                                        setShowRegister(true)
                                    }}>Register</Nav.Link>
                                </Nav.Item>
                                <hr />
                                {showLogin ? <Login /> : null}

                                {showRegister ? <Register /> : null}

                            </div>
                        }
                    </Nav>

                    <hr />
                    <p>Built by <a href="https://github.com/ashetonsm">Asheton S. M.</a></p>
                </Offcanvas.Body>
            </Offcanvas>
            <Container>
                <Outlet />
            </Container>
        </>
    )
}