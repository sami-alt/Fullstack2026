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
  const [visible, setVisible] = useState(false)
  
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
  
  const addBlog = async (newPost) => {
      try{
           const newBlog = await blogsServices.addBlog(newPost)
           setBlogs(blogs.concat(newBlog))
           setMessage({msg:'Blog post added', status:'success'})
        }catch(error){
            setMessage({msg:error.response.data.error, status:'error'})
        }
  }

  const LoggedIn = ({blogs, setBlogs, user, setUser, message, setMessage}) => {
    return (
    <>
      <Message message={message} setMessage={setMessage}></Message>
      <h2>Blogs</h2>
      {user.name}<br/>
      <button onClick={() => {setUser(null), window.localStorage.removeItem('loggedInUser'), setMessage({msg:'Logged out',status:'success'}) }}>logout</button><br/>
      <button onClick={()=> setVisible(true)}>Add blog post</button>     
      <AddBlog setMessage={setMessage} blogs={blogs} setBlogs={setBlogs} visible={visible} setVisible={setVisible} createBlog={addBlog}/>
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