import { GuessDisplayH } from "@/components/guessDisplayH";
import GameContext from "@/context/GameContext";
import Paginate from "@/lib/paginate";
import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";

const Profile = ({ history, user }: { history?: any, user: any }) => {

    const [pageNumber, setPageNumber] = useState(1)
    const { dispatch, darkMode, isAuthenticated } = useContext(GameContext);

    useEffect(() => {
        const appBG = document.getElementById('__next')

        // Dark mode was already set on load
        if (window.localStorage.getItem("darkMode")) {
            // Update the state to match
            dispatch({ type: 'SET_DARK_MODE', payload: true })
            appBG?.classList.add('darkMode')
        } else {
            if (darkMode === true) {
                appBG?.classList.add('darkMode')
                window.localStorage.setItem('darkMode', 'true')

            } else {
                appBG?.classList.remove('darkMode')
                window.localStorage.removeItem('darkMode')
            }
        }

    }, [darkMode])

    useEffect(() => {
        if (user && !isAuthenticated) {
            dispatch({ type: 'SET_IS_AUTHENTICATED', payload: true })
        }
    })

    return (
        <Container>
            <div className="text-center d-flex flex-wrap justify-content-center">
                <h3>Hello {user ? user.attributes.email : '...'}! This is your game history:</h3>
            </div>

            {history ?
                <div>
                    <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
                        <Button
                            disabled={pageNumber - 1 > 0 ? false : true}
                            onClick={() => {
                                if ((pageNumber - 1) > 0) {
                                    setPageNumber(pageNumber - 1)
                                }
                            }}>Prev. Page</Button>

                        <span>Page {pageNumber}/{history.length}</span>

                        <Button
                            disabled={pageNumber + 1 <= history.length ? false : true}
                            onClick={() => {
                                if (pageNumber + 1 <= history.length) {
                                    setPageNumber(pageNumber + 1)
                                }
                            }}>Next Page</Button>

                    </div>
                    <GuessDisplayH games={Paginate(history, 1, pageNumber)} />
                </div>
                :
                <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
                    <h4>
                        No games found!
                    </h4>
                </div>
            }
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const { Auth } = withSSRContext({req});
    var user = null;
    try {
        user = await Auth.currentAuthenticatedUser()
        console.log(`This email address is logged in: ${user.attributes.email}`)
    } catch (err) {
        console.log("No cognito user is logged in")
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        };
    }

    /*
    const getHistory = await fetch(`${process.env.NEXTAUTH_URL}/api/games`, {
        method: 'GET',
        headers: {
            cookie: req.headers.cookie || ""
        }
    })

    const historyObj = await getHistory.json()
    var history = null
    if (historyObj.history) {
        history = historyObj.history.reverse()
    }
    
    */
    return {
        props: {
            user: JSON.parse(JSON.stringify(user))
        }
    };
};

export default Profile;