import Offcanvas from 'react-bootstrap/Offcanvas'
import { useContext, useEffect, useState } from "react"
import { Login } from './Login'
import { Register } from './Register'
import { Button, Container, Nav } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import LoginContext from '../context/LoginContext'

export const Menu = () => {

    const { dispatch } = useContext(LoginContext);

    const [showMenu, setShowMenu] = useState(false)
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)
    const [loggedIn, setLoggedIn] = useState(true)


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
                if (response.status == 200) {
                    alert("Log out successful!");
                } else {
                    alert("Log out unsuccessful.");
                }
            })
    }

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