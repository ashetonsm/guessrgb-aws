import { getHistory } from "@/lib/api/history";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"

const Profile = ({ history, currentUser }: { history?: any, currentUser: string }) => {
        console.log(history)
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

    const history = await getHistory();
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