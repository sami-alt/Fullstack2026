import { useState } from "react"
import loginServices from "../services/loginServices"

const Login = ({user, setUser}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleName = (event) => {
        setUsername(event.target.value)
    }

    const handlePass = (event) => {
        setPassword(event.target.value)
    }

    console.log(username ,password)
    const loginAction = async () => {
        event.preventDefault()
        const user = await loginServices.login({username:username, password:password})
        //console.log('user',user)
        setUser(user)
    }


    return (
        <>
            <h2>Login</h2>
            <form onSubmit={loginAction}>
                Username
                <input onChange={handleName} value={username}></input>
                <br/>
                Password
                <input onChange={handlePass} value={password} type="password"></input>
                <br/>
                <button type="submit">Login</button>
            </form>
        </>
    )
}


export default Login