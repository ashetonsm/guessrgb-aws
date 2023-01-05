import { useContext, useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { GuessDisplayH } from "../components/GuessDisplayH";
import LoginContext from "../context/LoginContext";

export const Profile = () => {
    const [gameHistory, setGameHistory] = useState(null);
    const [fetched, setFetched] = useState(false);

    const { userId } = useContext(LoginContext);



    useEffect(() => {

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
                setGameHistory(data.history)

            } else {
                console.log("No games found.")
            }

            return console.log(data)
        }

        if (gameHistory == null && userId !== null && fetched !== true) {
            fetchHistory();
            console.log("Done fetching history.")
            setFetched(true);
        }
    }, [gameHistory, userId, fetched])



    return (
        <Container>
            <h3>{userId ? `Hello!` : "You're not logged in!"}</h3>

            <h4>This is your game history:</h4>
            {gameHistory !== null ? <GuessDisplayH games={gameHistory} /> : null}
        </Container>
    )
}