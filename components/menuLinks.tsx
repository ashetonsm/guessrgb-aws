import Link from "next/link"
import { useContext, useState } from "react"
import { Nav } from "react-bootstrap"
import { Login } from "@/components/login"
import { Register } from "@/components/register"
import GameContext from "@/context/GameContext"
import { Auth } from 'aws-amplify'
import Router from "next/router"

export const MenuLinks = () => {
    const { isAuthenticated } = useContext(GameContext);
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)

    const redirectHome = () => {
        Router.push("/")
    }

    return (
        <Nav variant="pills" className='d-inline' justify defaultActiveKey={"login"}>
            {isAuthenticated ?
                <div>
                    <Nav.Item>
                        <Link href={"/"} className="nav-link">Home</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link href={"/profile"} className="nav-link">Profile</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => {
                            setShowRegister(false)
                            setShowLogin(true)
                            Auth.signOut()
                            redirectHome()
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