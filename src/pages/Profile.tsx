import { useContext, useState } from "react"
import { Container } from "react-bootstrap"
import { GuessDisplayH } from "../components/GuessDisplayH";
import LoginContext from "../context/LoginContext";

export const Profile = () => {
    const [gameHistory, setGameHistory] = useState(null);

    const { dispatch, userId } = useContext(LoginContext);

    const fetchHistory = async () => {
        var result;

        if (gameHistory == null) {

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
                console.log(data.history)
                setGameHistory(data.history)

            } else {
                result = data;
            }
        }
        // console.log(gameHistory)
        return console.log(result)
    }
}


    return (fetchHistory(),
        <>
            <Container>
                <h3>{userId ? `Hello!` : "You're not logged in!"}</h3>

                <h4>This is your game history:</h4>
                {gameHistory !== null ? <GuessDisplayH games={gameHistory}/> : null}
            </Container>
        </>
    )
}