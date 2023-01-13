import Offcanvas from 'react-bootstrap/Offcanvas'
import { useContext, useState } from "react"
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { InfoBox } from './InfoBox'
import { Settings } from './Settings'
import { MenuLinks } from './MenuLinks'
import LoginContext from '../context/LoginContext'

export const Menu = (loggedIn: { loggedIn: boolean }) => {

    const { dispatch, darkMode } = useContext(LoginContext)
    const [showSettings, setShowSettings] = useState(false)
    const [showInfoBox, setShowInfoBox] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            {/* Begin header area */}
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
                            className='mx-2'
                            style={{
                                cursor: 'help',
                                fontSize: '1em'
                            }}>❔</span>

                        <span onClick={() => setShowSettings(true)}
                            className='mx-2'
                            style={{
                                cursor: 'pointer',
                                fontSize: '1em'
                            }}>🔧</span>

                        <span onClick={() => {
                            dispatch({ type: 'SET_DARK_MODE', payload: !darkMode });
                        }}
                            className='mx-2'
                            style={{
                                cursor: 'pointer',
                                fontSize: '1em'
                            }}>{darkMode.toString() === "true" ? "🌑" : "☀"}</span>
                    </Col>
                </Row>
            </Container>
            <hr />

            <InfoBox show={showInfoBox} onHide={() => setShowInfoBox(false)} />
            <Settings show={showSettings} onHide={() => setShowSettings(false)} />
            {/* End header area */}


            {/* Begin menu area */}
            <Offcanvas
                show={showMenu}
                onHide={() => setShowMenu(false)}
                className="d-flex justify-content-center">
                <Offcanvas.Header id="menuHeader"
                    className={`${darkMode ? "darkMode" : ""}`}
                    closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={`flex-row text-center ${darkMode ? "darkMode" : ""}`} id="menu">
                    <MenuLinks loggedIn={loggedIn.loggedIn} />

                    <hr />
                    <p>Built by <a href="https://github.com/ashetonsm">Asheton S. M.</a></p>
                </Offcanvas.Body>
            </Offcanvas>
            {/* End menu area */}

            {/* Page content area */}
            <Outlet />
        </>

    )
}