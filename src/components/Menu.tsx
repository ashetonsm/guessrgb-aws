import Offcanvas from 'react-bootstrap/Offcanvas'
import { useContext, useState } from "react"
import { Login } from './Login'
import { Register } from './Register'
import { Button, Col, Container, Nav, Row } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import LoginContext from '../context/LoginContext'
import { InfoBox } from './InfoBox'
import { Settings } from './Settings'

export const Menu = (loggedIn: { loggedIn: boolean }) => {

    const { dispatch } = useContext(LoginContext);

    const [showSettings, setShowSettings] = useState(false)
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
            <Container>
                <Row>
                    <Col className="justify-content-start mt-2">
                        <Button onClick={() => setShowMenu(true)}
                            style={{
                                cursor: 'pointer',
                                position: 'sticky',
                            }}>MENU</Button>
                    </Col>
                    <Col className='d-flex justify-content-center mt-2'>
                        <h1 className="text-center" id="title">guessRGB</h1>
                    </Col>
                    <Col className='d-flex justify-content-end mt-2'>
                        <span onClick={() => setShowInfoBox(true)}
                            className='mx-4'
                            style={{
                                cursor: 'help',
                                fontSize: '1em'
                            }}>❔</span>

                        <span onClick={() => setShowSettings(true)}
                            style={{
                                cursor: 'pointer',
                                fontSize: '1em'
                            }}>🔧</span>
                    </Col>
                </Row>
            </Container>
            <hr />

            <InfoBox show={showInfoBox} onHide={() => setShowInfoBox(false)} />
            <Settings show={showSettings} onHide={() => setShowSettings(false)} />

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
            <Outlet />
        </>

    )
}