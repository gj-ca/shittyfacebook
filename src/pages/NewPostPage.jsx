import { useEffect, useState } from "react"

export default function NewPostPage({addToPosts, friends}) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        owner: ""
    })

    // Two way binding
    const handleSubmit = async (event) => {
        event.preventDefault()
        const newPost = {
            title: form.title,
            description: form.description,
            owner: form.owner
        }
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/posts", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newPost)
        })
        if (res.status == 201) {
            addToPosts(newPost)
            setForm({
                title: "",
                description: "",
                owner: ""
            })
        } else {
            console.log("something went wrong")
        }
    }

    useEffect(() => {
        if (friends.length > 0) {
            setForm({...form, owner: friends[0].name.first})
        }
    }, [friends])
    return (
        <>
            <h1>New Post Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input 
                        value={form.title} 
                        onChange={event => setForm({...form, title: event.target.value})}/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea 
                        value={form.description} 
                        onChange={event => setForm({...form, description:event.target.value })} />
                </div>
                <div>
                    <label>Belongs To:</label>
                    <select 
                        value={form.owner} 
                        onChange={event => setForm({...form, owner: event.target.value})}>
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