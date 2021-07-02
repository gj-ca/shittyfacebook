export default function Post({title, owner, description}) {
    return (
        <>
            <h4>{title}</h4>
            <span>By {owner}</span>
            <p>{description}</p>
        </>
    )
}