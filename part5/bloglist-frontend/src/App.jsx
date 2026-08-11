import { useState, useEffect} from 'react'
import Blogs from './components/Blogs'

import Login from './components/Login'
import blogsServices from './services/blogsServices'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogsServices.getAll()
      setBlogs(blogs) 
    } 
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
    getBlogs()
  }, [])
  


  const loggedIn = (blogs) => {
    return (
    <>
      <Blogs blogs={blogs} user={user} setUser={setUser}/>
    </>
  )
  }

  const notLoggedIn = (user) => {
    console.log('logged out',window.localStorage.getItem('loggedInUser'))
    return (<Login user={user} setUser={setUser}/>)
  }


  return (
    <>
      {user ? loggedIn(blogs) : notLoggedIn(user)}
    </>
  )
}

export default App