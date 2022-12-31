import { useContext } from "react"
import { Container } from "react-bootstrap"
import LoginContext from "../context/LoginContext";

export const Profile = () => {

    const { dispatch, userId } = useContext(LoginContext);

    return (
        <>
            <Container>
                {userId ? `Hello!` : "You're not logged in!"}
            </Container>
        </>
    )
}