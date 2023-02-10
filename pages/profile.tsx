import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"

const Profile = ({ history, currentUser }: { history?: any, currentUser: string }) => {
    console.log(history.history)
    return (`Welcome, ${currentUser}!`)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        };
    }

    const getHistory = await fetch('http://localhost:3000/api/games', {
        method: 'GET',
        headers: {
            cookie: req.headers.cookie || ""
        }
    })

    const history = await getHistory.json()
    const currentUser = session.user?.email?.toString()

    return {
        props: {
            session,
            history,
            currentUser
        }
    };
};

export default Profile;