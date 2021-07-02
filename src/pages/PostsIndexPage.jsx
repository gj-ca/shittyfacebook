import Post from '../components/Post'

export default function PostsIndexPage({posts}) {
    return (
        <>
            <h1>All Posts</h1>
            {posts.map(({title, owner, description}) => 
            <Post {
                ...{title, owner, description}
            }/>)}
        </>
    )
}