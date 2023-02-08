import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react"

const Profile = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (`Welcome, ${session.user.name}!`)

    } else {
        return (`Sign in required to view this page.`)
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        };
    }
    return {
        props: { session }
    };
};

export default Profile;