import { useState } from 'react'
import loginServices from '../services/loginServices'
import blogsServices from '../services/blogsServices'

const Login = ({ setUser, setMessage }) => {

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
    try{
      const user = await loginServices.login({ username:username, password:password })
      blogsServices.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setMessage({ msg:'Logged in', status:'success' })
    }catch(error){
      setMessage({ msg:error.response.data.error, status:'error' })
    }
  }


  return (
    <>
      <h2>Login</h2>
      <form onSubmit={loginAction}>
        <label>

                Username
        <input onChange={handleName} value={username}></input>
        </label>
        <br/>
        <label>
                Password
        <input onChange={handlePass} value={password} type="password"></input>
        </label>
        <br/>
        <button type="submit">Login</button>
      </form>
    </>
  )
}


export default Login