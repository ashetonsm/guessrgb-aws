import { useContext, useState } from "react"
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import LoginContext from "../context/LoginContext"
import { Login } from "./Login"
import { Register } from "./Register"

export const MenuLinks = (loggedIn: { loggedIn: boolean }) => {
    const { dispatch } = useContext(LoginContext);

    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)

    /**
     * Logs the user out via session.destroy on the backend. Deletes the connect.sid and userId cookies.
     */
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
                if (response.status === 200) {
                    dispatch({ type: 'SET_USERID', payload: null });
                    dispatch({ type: 'SET_FETCHED_HISTORY', payload: null });
                    return dispatch({ type: 'SET_FETCH_COMPLETE', payload: false });
                }
            })
    }

    return (
        <Nav variant="pills" className='d-inline' justify defaultActiveKey={loggedIn.loggedIn ? undefined : "login"}>
            {loggedIn.loggedIn ?
                <div>
                    <Nav.Item>
                        <Link to={"/guessRGB"} className="nav-link">Home</Link>
                    </Nav.Item>
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
    )
}