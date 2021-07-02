export default function PostsIndexPage(props) {
    return (
        <>
            <h1>All Posts</h1>
            {props.posts.map(post => (
                <>
                    <h4>{post.title}</h4>
                    <span>By {post.owner}</span>
                    <p>{post.description}</p>
                </>
            ))}
        </>
    )
}