import {useState} from 'react'
import { useHistory } from 'react-router'

export default function SignUpPage({setAuthenticated}) {
    // step 1 - declare state
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [flash, setFlash] = useState(false)
    const {push} = useHistory()

    const dataIsValid = () => {
        return true
    }
    const handleSubmit = event => {
        event.preventDefault()
        if (dataIsValid()) {
            setAuthenticated(true)
            push("/")
        } else {
            setFlash("Incorrect Data")
        }
    }
    return (
        <>
            <h1>Sign Up</h1>
            {flash && <p>{flash}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    {/* Step 2 give input a value and onChange */}
                    <label>Username:</label>
                    <input 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <button>Sign Up</button>
            </form>
        </>
    )
}