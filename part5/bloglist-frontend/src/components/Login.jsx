import { useState } from "react"
import loginServices from "../services/loginServices"
import blogsServices from "../services/blogsServices"

const Login = ({user, setUser, setToken}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleName = (event) => {
        setUsername(event.target.value)
    }

    const handlePass = (event) => {
        setPassword(event.target.value)
    }

    const loginAction = async () => {
        event.preventDefault()
        const user = await loginServices.login({username:username, password:password})
        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        blogsServices.setToken(user.token)
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