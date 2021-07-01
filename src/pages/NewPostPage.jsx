import { useEffect, useState } from "react"

export default function NewPostPage({addToPosts, friends}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [owner, setOwner] = useState("")
    // Two way binding
    const handleSubmit = (event) => {
        event.preventDefault()
        const newPost = {
            title: title,
            description: description,
            owner: owner
        }
        addToPosts(newPost, () => {
            setTitle("")
            setDescription("")
            setOwner("")
        })
    }

    useEffect(() => {
        console.log("Friends has changed")
        // friends.length > 0 && setOwner(friends[0].name.first)
        if (friends.length > 0) {
            setOwner(friends[0].name.first)
        }
    }, [friends])
    return (
        <>
            <h1>New Post Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input value={title} onChange={event => setTitle(event.target.value)}/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={description} onChange={event => setDescription(event.target.value)} />
                </div>
                <div>
                    <label>Belongs To:</label>
                    <select value={owner} onChange={event => setOwner(event.target.value)}>
                        {friends.map(friend => (
                            <option 
                                key={friend.name.first}
                                value={friend.name.first}
                            >{friend.name.first}</option>
                        ))}
                    </select>
                </div>
                <button>Submit</button>
            </form>
        </>
    )
}