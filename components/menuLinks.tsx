import Link from "next/link"
import { useState } from "react"
import { Nav } from "react-bootstrap"
import { Login } from "@/components/login"
import { Register } from "@/components/register"

export const MenuLinks = ({user}:any) => {
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)

    return (
        <Nav variant="pills" className='d-inline' justify defaultActiveKey={"login"}>
            {user ?
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