import { useContext } from "react"
import { Container } from "react-bootstrap"
import LoginContext from "../context/LoginContext";

export const Profile = () => {

    const { dispatch, userId } = useContext(LoginContext);

    const fetchHistory = async () => {
        var result;

        if (userId !== null) {
            const response = await fetch(`http://localhost:5000/api/games/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const data = await response.json()
            if (data.status === "success") {
                result = data;

            } else {
                result = data;
            }
        }
        return console.log(result)
    }

    return (fetchHistory(),
        <>
            <Container>
                <h3>{userId ? `Hello!` : "You're not logged in!"}</h3>

                <h4>This is your game history:</h4>
            </Container>
        </>
    )
}