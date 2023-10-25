import { GuessDisplayH } from "@/components/guessDisplayH";
import GameContext from "@/context/GameContext";
import Paginate from "@/lib/paginate";
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import * as queries from '@/src/graphql/queries';
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";

const Profile = ({ history, user }: { history?: any, user: any }) => {

    const [pageNumber, setPageNumber] = useState(1)
    const { dispatch, darkMode, isAuthenticated } = useContext(GameContext);

    /**
     * Toggles dark mode
     */
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
                <h5>Options:</h5>
            </div>
            <div className="text-center d-flex flex-wrap justify-content-center mb-3">
                <a href="/change-password">Change Password</a>
            </div>
            <hr/>
            <div className="text-center d-flex flex-wrap justify-content-center">
                <h3>Hello {user ? user.attributes.email : '...'}! This is your game history:</h3>
            </div>


            {history.length !== 0 ?
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
    const { Auth } = withSSRContext({ req });
    var user = null;
    try {
        user = await Auth.currentAuthenticatedUser()
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        };
    }

    const game = {
        email: user.attributes.email.toString()
    }

    interface GraphQLResult {
        data?: any;
        errors?: [object];
        extensions?: {
            [key: string]: any;
        };
    }

    var history = null
    history = await API.graphql(graphqlOperation(queries.gameByEmail, game)) as GraphQLResult
    history = history.data.gameByEmail.items

    return {
        props: {
            user: JSON.parse(JSON.stringify(user)),
            history
        }
    };
};

export default Profile;