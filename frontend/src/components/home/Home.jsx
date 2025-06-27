import { useAuth } from "../../context/AuthContext";

function Home() {
    const { signOut, user } = useAuth();

    const handleClick = async () => {
        await signOut();
    }

    return (
        <>
            Home
            {<p>{user.username}</p>}
            <button onClick={handleClick}>Sign out</button>
        </>
    );
}

export default Home;