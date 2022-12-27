import Offcanvas from 'react-bootstrap/Offcanvas'
import { useState } from "react"
import { Login } from './Login'
import { Register } from './Register'
import { Button, Nav } from 'react-bootstrap'

export const Menu = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const checkCookies = () => {
        var checked = false;
        while (!checked) {
            if (!loggedIn) {
                var loginCookie = document.cookie.split(';')[0].split('username=')[1]
                if (loginCookie !== undefined) {
                    console.log(loginCookie)
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
            var date:Date = new Date();
            date.setTime(date.getTime() - (24 * 60 * 60 * 1000));
            document.cookie = `username=; expires=${date.toUTCString()}; path=/`;
            console.log(document.cookie)
            setLoggedIn(false)
            console.log('Logged out')
        } else {
            console.log('Already logged out.')
        }
    }

return (checkCookies(),
    <>
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
                        <Nav.Link>Home</Nav.Link>
                    </Nav.Item>
                    {loggedIn ?
                        <div>
                            <Nav.Item>
                                <Nav.Link>Profile</Nav.Link>
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
    </>
)
}