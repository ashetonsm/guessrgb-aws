import { useContext, useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap"
import { GuessDisplayH } from "../components/GuessDisplayH";
import LoginContext from "../context/LoginContext";
import Paginate from "../utilities/PaginateArray";

export const Profile = () => {
    const { dispatch, userId, fetchedHistory, fetchComplete } = useContext(LoginContext);
    const [pageNumber, setPageNumber] = useState(1)

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
                dispatch({ type: 'SET_FETCHED_HISTORY', payload: data.history.reverse() });
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
            <Button >Reload</Button>
            <div>
                <Button onClick={() => {
                    if ((pageNumber - 1) > 0) {
                        setPageNumber(pageNumber - 1)
                    } else {
                        alert("Out of page range!")
                    }
                }}>Prev. Page</Button>
                <span>Page {pageNumber}</span>
                <Button onClick={() => {
                    if (pageNumber + 1 <= fetchedHistory.length) {
                        setPageNumber(pageNumber + 1)
                    } else {
                        alert("Out of page range!")
                    }
                }}>Next Page</Button>

            </div>
            {fetchComplete ? (fetchedHistory ? <GuessDisplayH games={Paginate(fetchedHistory, 1, pageNumber)} /> : <div>No games found.</div>) : <div>Loading...</div>}
        </Container>
    )
}