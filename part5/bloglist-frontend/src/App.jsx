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
    getBlogs()
  }, [])
  


  const loggedIn = (blogs) => {
    return (
    <>
      <Blogs blogs={blogs} user={user}/>
    </>
  )
  }

  const notLoggedIn = (user) => {
    return (<Login user={user} setUser={setUser}/>)
  }


  return (
    <>
      {user ? loggedIn(blogs) : notLoggedIn(user)}
    </>
  )
}

export default App