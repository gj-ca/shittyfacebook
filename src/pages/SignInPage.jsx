import {useContext, useState} from 'react'
import { useHistory } from 'react-router'
import Context from '../context'

export default function SignInPage() {
    // step 1 - declare state
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [flash, setFlash] = useState(false)
    const {push} = useHistory()
    const {dispatch} = useContext(Context)


    const dataIsValid = () => {
        return true
    }
    const handleSubmit = event => {
        event.preventDefault()
        if (dataIsValid()) {
            // setAuthenticated(true)
            dispatch({
                type: "setAuthenticated", 
                value: true
            })
            push("/")
        } else {
            setFlash("Incorrect Data")
        }
    }
    return (
        <>
            <h1>Sign In</h1>
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
                <button>Sign In</button>
            </form>
        </>
    )
}