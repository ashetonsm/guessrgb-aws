import { useContext, useEffect } from "react"
import { Container } from "react-bootstrap"
import { GuessDisplayH } from "../components/GuessDisplayH";
import LoginContext from "../context/LoginContext";

export const Profile = () => {
    const { dispatch, userId, fetchedHistory, fetchComplete } = useContext(LoginContext);

    useEffect(() => {
        if (!fetchComplete) {
            fetchHistory()
            dispatch({ type: 'SET_FETCH_COMPLETE', payload: true });
        }
    })

    const fetchHistory = async () => {
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
            if (data.history) {
                dispatch({ type: 'SET_FETCHED_HISTORY', payload: data.history });
            } else {
                console.log("No games found.")
            }

        } else {
            console.log("No games found.")
        }
        return console.log(data)
    }

    return (
        <Container>
            <h3>{userId ? `Hello!` : "You're not logged in!"}</h3>

            <h4>This is your game history:</h4>
            {fetchComplete && fetchedHistory ? <GuessDisplayH games={fetchedHistory} /> : <div>No games found.</div>}
        </Container>
    )
}