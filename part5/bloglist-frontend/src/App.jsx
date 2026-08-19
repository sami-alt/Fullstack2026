import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Login from './components/Login'
import blogsServices from './services/blogsServices'
import AddBlog from './components/AddBlog'
import Message from './components/Message'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  //const [token, setToken] = useState(null)
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
      const newObj = { ...newBlog, user:{ name:user.name } }
      setBlogs(blogs.concat(newObj))
      setMessage({ msg:'Blog post added', status:'success' })
    }catch(error){
      setMessage({ msg:error.response.data.error, status:'error' })
    }
  }
  
  const updateLikes = async (updatedPost, id) => {
    try{
      const updated = await blogsServices.updateBlog(updatedPost, id)
      const user = blogs.filter(blog => blog.id === updated.id)[0].user.name
      setBlogs(blogs.filter(blog => blog.id !== updated.id).concat({ ...updated, user:{ name:user } }))
      setMessage({ msg:'Liked', status:'success' })
    }catch(error){
      setMessage({ msg:error.response.data.error, status:'error' })
    }
  }
  
  const removePost = async (id) => {
    console.log('delete')
    const toDelete = blogs.filter(blog => blog.id === id)[0].title
    try{
      if(window.confirm(`are you sure you want to delete post ${toDelete}`)){
        await blogsServices.deletePost(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setMessage({ msg:'post removed', status:'success' })
      }else{
        return
      }
    }catch(error){
      setMessage({ msg:error.response.data.error , status:'error' })
    }
  }
  /*
  const LoggedIn = ({ blogs, setBlogs, user, setUser, message, setMessage }) => {
    return (
      <>
      <Message message={message} setMessage={setMessage}></Message>
      <h2>Blogs</h2>
      {user.name}
      <button onClick={() => {setUser(null), window.localStorage.removeItem('loggedInUser'), setMessage({ msg:'Logged out',status:'success' }) }}>logout</button><br/>
      <button onClick={() => setVisible(true)}>Add blog post</button>
      <AddBlog setMessage={setMessage} blogs={blogs} setBlogs={setBlogs} visible={visible} setVisible={setVisible} createBlog={addBlog}/>
        <Blogs blogs={blogs} user={user} setUser={setUser} setMessage={setMessage} like={updateLikes} deletePost={removePost}/>
      </>
      )
      }
          */
  return (
    <>
      <Router>

        <div>
          <Link to='/'>blogs</Link>
          {user ? <button onClick={() => {setUser(null), window.localStorage.removeItem('loggedInUser'), setMessage({ msg:'Logged out',status:'success' }) }}>logout</button>: <Link to='login'>Login</Link>}
        </div>
      <Message message={message} setMessage={setMessage}></Message>
      <Routes>
          <Route path='/blogs/:id' element={<Blog blogs={blogs} like={updateLikes} deletePost={removePost} user={user}></Blog>}></Route>
          <Route path='/' element={<Blogs blogs={blogs} user={user} setUser={setUser} setMessage={setMessage} like={updateLikes} deletePost={removePost}/>} />
          <Route path='/login' element={<Login user={user} setUser={setUser} setMessage={setMessage}/>}/>
      </Routes>
      </Router>
    </>
  )

}

export default App