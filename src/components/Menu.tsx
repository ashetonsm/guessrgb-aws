import Offcanvas from 'react-bootstrap/Offcanvas'
import { useState } from "react"
import { Login } from './Login'
import { Register } from './Register'
import { Button, Container, Nav } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

export const Menu = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const checkCookies = () => {
        var checked = false;
        while (!checked) {
            if (!loggedIn) {
                var loggedInEmail = document.cookie.split(';')[0].split('username=')[1]
                if (loggedInEmail !== undefined) {
                    console.log(loggedInEmail)
                    setLoggedIn(true)
                    console.log('Logged in')
                } else {
                    console.log('no login cookie')
                }
            }
            checked = true;
        }
    }

    const logOut = () => {
        if (loggedIn) {
            var date: Date = new Date();
            date.setTime(date.getTime() - (24 * 60 * 60 * 1000));
            document.cookie = `username=; expires=${date.toUTCString()}; path=/`;
            setLoggedIn(false)
            console.log('Logged out')
        } else {
            console.log('Already logged out.')
        }
    }

    return (checkCookies(),
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
                    <Nav variant="pills" className='d-inline' justify defaultActiveKey={loggedIn ? undefined : "login"}>
                        <Nav.Item>
                            <Link to={"/guessRGB/home"} className="nav-link">Home</Link>
                        </Nav.Item>
                        {loggedIn ?
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
                                    <Nav.Link eventKey="login" onClick={(e) => {
                                        setShowRegister(false)
                                        setShowLogin(true)
                                    }}>Log in</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="register" onClick={(e) => {
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