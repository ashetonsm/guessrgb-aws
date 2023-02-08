import { useSession } from "next-auth/react"

const Profile = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (`Welcome, ${session.user.name}!`)

    } else {
        return (`Sign in required to view this page.`)
    }
}

export default Profile;