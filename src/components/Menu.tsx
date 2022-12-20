import Offcanvas from 'react-bootstrap/Offcanvas'
import { useState } from "react"
import { Login } from './Login'
import { Register } from './Register'

export const Menu = () => {

    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            <span onClick={() => setShowMenu(true)}
                style={{
                    cursor: 'pointer',
                    position: 'sticky',
                    left: '2vw'
                }}>MENU</span>

            <Offcanvas show={showMenu} onHide={ () => setShowMenu(false) }>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <h5>Coming soon:</h5>
                    <p>Log in</p>
                    <Login/>
                    <p>Register</p>
                    <Register/>
                    <p>Log out</p>
                    <hr/>
                    <p>About</p>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}