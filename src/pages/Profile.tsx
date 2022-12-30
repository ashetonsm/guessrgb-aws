import { useContext } from "react"
import { Container } from "react-bootstrap"
import LoginContext from "../context/LoginContext";

export const Profile = () => {

    const { dispatch } = useContext(LoginContext);

    return (
        <>
            <Container>
                Hello, {document.cookie.split('username=')}
            </Container>
        </>
    )
}