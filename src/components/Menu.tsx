import Offcanvas from 'react-bootstrap/Offcanvas'
import { useState } from "react"
import { Login } from './Login'
import { Register } from './Register'
import { Button, Nav } from 'react-bootstrap'

export const Menu = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)
    var loggedIn = false

    return (
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
                                    <Nav.Link>Log out</Nav.Link>
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
                                {showLogin ? <Login /> : null}

                                {showRegister ? <Register /> : null}

                            </div>
                        }
                    </Nav>

                    <hr />
                    <p>Asheton S. M.</p>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}