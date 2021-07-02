import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import Post from '../components/Post'

export default function FriendsPostsPage() {
    const {name} = useParams()
    const [friend, setFriend] = useState(null)
    const [posts, setPosts] = useState([])
    
    // bad idea
    // filter out the props.posts that don't belong
    // to that friend
    // find the friend in props.friends

    // good idea
    // make an api call to your server
    // which send back the friend and their posts
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + `/friends?name.first=${name}`)
            .then(res => res.json())
            .then(json => setFriend(json[0]))
        fetch(process.env.REACT_APP_BACKEND_URL + `/posts?owner=${name}`)
        .then(res => res.json())
        .then(json => setPosts(json))
    }, [])


    return (
        <>
            {friend ? (
                <>
                <h1>{friend.name.first}'s Information</h1>
                    <dl>
                    <dt>Email: </dt>
                    <dd>{friend.email}</dd>
                    <dt>Gender: </dt>
                    <dd>{friend.gender}</dd>
                    <dt>Picture: </dt>
                    <dd><img src={friend.picture.large} /></dd>
                    </dl>
                <h1>{friend.name.first}'s Posts</h1>
            </>
            ) : null }
            {posts.map(post => <Post 
                {...{...post}}
            />)}
        </>
    )
}