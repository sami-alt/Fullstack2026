import { useState, useEffect} from 'react'
import Blogs from './components/Blogs'

import Login from './components/Login'
import blogsServices from './services/blogsServices'
import AddBlog from './components/AddBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

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
    console.log(token)
    return (
    <>
      <AddBlog/>
      <Blogs blogs={blogs} user={user} setUser={setUser}/>
    </>
  )
  }

  const notLoggedIn = (user) => {
    //console.log('logged out',window.localStorage.getItem('loggedInUser'))
    return (<Login user={user} setUser={setUser} setToken={setToken}/>)
  }


  return (
    <>
      {user ? loggedIn(blogs) : notLoggedIn(user)}
    </>
  )
}

export default App