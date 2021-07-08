import Person from "../components/Person"
import {Link} from 'react-router-dom'
import { useContext } from "react"
import Context from "../context"

function NewUserPage({handleClick, handleAddToFriends, friends}) {
    const {newUser} = useContext(Context)
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
                <Link to={`/friends/${friend.name.first}`}>See {friend.name.first}'s Posts</Link>
            </>
            ))}
        </div>
      </>
    )
}

export default NewUserPage