import Offcanvas from 'react-bootstrap/Offcanvas'
import { useContext, useState } from "react"
import { Login } from './Login'
import { Register } from './Register'
import { Button, Container, Nav } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import LoginContext from '../context/LoginContext'
import { InfoBox } from './InfoBox'

export const Menu = (loggedIn: { loggedIn: boolean }) => {

    const { dispatch } = useContext(LoginContext);

    const [showInfoBox, setShowInfoBox] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)

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
                    console.error("Log out unsuccessful.");
                }
            })
    }

    return (
        <>
            <span onClick={() => setShowInfoBox(true)}
                style={{
                    cursor: 'help',
                    position: 'sticky',
                    top: '2vh',
                    left: '95vw'
                }}>❔</span>
            <InfoBox show={showInfoBox} onHide={() => setShowInfoBox(false)} />
            <Button onClick={() => setShowMenu(true)}
                style={{
                    cursor: 'pointer',
                    position: 'sticky',
                    top: '2vh',
                    left: '2vw'
                }}>MENU</Button>

            <h1 className="text-center">guessRGB</h1>

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
                                    <Nav.Link onClick={() => {
                                        setShowRegister(false)
                                        setShowLogin(true)
                                        logOut()
                                    }}>Log out</Nav.Link>
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