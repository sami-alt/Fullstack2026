import { useState, useEffect} from 'react'
import Blogs from './components/Blogs'

import Login from './components/Login'
import blogsServices from './services/blogsServices'
import AddBlog from './components/AddBlog'
import Message from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)

  
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
  


  const LoggedIn = ({blogs, setBlogs, user, setUser, message, setMessage}) => {
    return (
    <>
      <Message message={message} setMessage={setMessage}></Message>
      <AddBlog setMessage={setMessage} blogs={blogs} setBlogs={setBlogs}/>
      <Blogs blogs={blogs} user={user} setUser={setUser} setMessage={setMessage}/>
    </>
  )
  }

  const NotLoggedIn = ({user, setUser, message, setMessage, setToken}) => {
    
    return (
    <>
      <Message message={message} setMessage={setMessage}></Message>
      <Login user={user} setUser={setUser} setToken={setToken} setMessage={setMessage}/>
    </>
  )
  }


  return (
    <>
      {user ? <LoggedIn blogs={blogs} setBlogs={setBlogs} user={user} setUser={setUser} message={message} setMessage={setMessage}/> : <NotLoggedIn user={user} setUser={setUser} message={message} setMessage={setMessage} setToken={setToken}/>}
    </>
  )
}

export default App