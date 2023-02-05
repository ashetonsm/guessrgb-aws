import Offcanvas from 'react-bootstrap/Offcanvas'
import { useState } from "react"
import { Button, Col, Container, Row } from 'react-bootstrap'
import { InfoBox } from '../InfoBox'
import { Settings } from '../Settings'
import { MenuLinks } from '../MenuLinks'

export const Menu = (loggedIn: { loggedIn: boolean }) => {

    const [showSettings, setShowSettings] = useState(false)
    const [showInfoBox, setShowInfoBox] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    var darkMode = true;

    return (
        <>
            {/* Begin header area */}
            <Container>
                <Row>
                    <Col className="justify-content-start">
                        <Button onClick={() => setShowMenu(true)}
                            style={{
                                marginTop: '1em',
                                cursor: 'pointer',
                                position: 'sticky',
                            }}>MENU</Button>
                    </Col>
                    <Col className='d-flex justify-content-center' style={{ marginTop: '1em', padding: 0 }}>
                        <h1 className="text-center" id="title" style={{ margin: '0' }} >guessRGB</h1>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <span onClick={() => setShowInfoBox(true)}
                            className='mx-2'
                            style={{
                                marginTop: 'auto',
                                marginBottom: 'auto',
                                cursor: 'help',
                                fontSize: '1em'
                            }}>❔</span>

                        <span onClick={() => setShowSettings(true)}
                            className='mx-2'
                            style={{
                                marginTop: 'auto',
                                marginBottom: 'auto', 
                                cursor: 'pointer',
                                fontSize: '1em'
                            }}>🔧</span>

                        <span onClick={() => {
                            darkMode = !darkMode;
                        }}
                            className='mx-2'
                            style={{
                                marginTop: 'auto',
                                marginBottom: 'auto', 
                                cursor: 'pointer',
                                fontSize: '1em'
                            }}>
                                {darkMode === true ? "🌑" : "☀"}
                                </span>
                    </Col>
                </Row>
            </Container>
            <hr style={{ marginTop: '1em' }} />

            {/* <InfoBox show={showInfoBox} onHide={() => setShowInfoBox(false)} /> */}
            {/* <Settings show={showSettings} onHide={() => setShowSettings(false)} /> */}
            {/* End header area */}


            {/* Begin menu area */}
            <Offcanvas
                show={showMenu}
                onHide={() => setShowMenu(false)}
                className="d-flex justify-content-center">
                <Offcanvas.Header id="menuHeader"
                    className={`${darkMode ? "darkMode" : ""}`}
                    closeButton>
                    <Offcanvas.Title id="menuTitle">Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={`flex-row text-center ${darkMode ? "darkMode" : ""}`} id="menu">
                    {/* <MenuLinks loggedIn={loggedIn.loggedIn} /> */}

                    <hr />
                    <p>Built by <a href="https://github.com/ashetonsm">Asheton S. M.</a></p>
                </Offcanvas.Body>
            </Offcanvas>
            {/* End menu area */}

            {/* Page content area */}
        </>

    )
}