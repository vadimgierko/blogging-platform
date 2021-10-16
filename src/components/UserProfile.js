export default function UserProfile({userData}) {
    return (
        <>
            <h1>{userData.firstName + " " + userData.lastName}</h1>
            <hr />
            <p>user name: {"@" + userData.userName}</p>
            <p>email: {userData.email}</p>
        </>
    );
}