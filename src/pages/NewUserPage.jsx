import Person from "../components/Person"

function NewUserPage({handleClick, handleAddToFriends, friends}) {
    return (
    <>
        <div>
            <h1>Random User</h1>
            <button onClick={handleClick}>Get User</button>
        </div>
        <div>
            {newUser ? (
            <>
                <Person
                friend={newUser} />
                <button onClick={handleAddToFriends}>Add To Friends List</button>
            </>
            ) : null}
        </div>
        <div>
            <h2>List of Friends</h2>
            {friends.map(friend => (
            <>
                <Person
                key={friend.email}
                friend={friend} />
                <Link to="/friends/email">See {friend.name.first}'s Posts</Link>
            </>
            ))}
        </div>
      </>
    )
}

export default NewUserPage