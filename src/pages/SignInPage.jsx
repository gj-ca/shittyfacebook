export default function SignInPage({setAuthenticated}) {
    const handleSubmit = event => {
        event.preventDefault()
    }
    return (
        <>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input />
                </div>
                <div>
                    <label>Password:</label>
                    <input />
                </div>
            </form>
            <button onClick={setAuthenticated}>Sign In</button>
        </>
    )
}