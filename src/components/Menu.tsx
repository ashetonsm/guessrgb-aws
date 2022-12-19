import Offcanvas from 'react-bootstrap/Offcanvas'
import { useState } from "react"

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

            <Offcanvas show={showMenu} onHide={() => {
                setShowMenu(false)
            }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}