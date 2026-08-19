import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blogs, like, deletePost, user }) => {
  const { id } = useParams()
  const blog = blogs.find(blog => blog.id === id)
  const navigate = useNavigate()

  if (!blog) {
    return <div>Blog not found</div>
  }

  const handleLike = () => {
    like({
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    }, blog.id)
  }

  const handleRemove = () => {
    deletePost(blog.id)
    navigate('/')
  }
  if (user)
      console.log('blog',blog.user.username,'user' ,user.username)
    console.log(user)
  return (
    <div className="blog">
      <div>
        <div className="infoTab">{blog.title}</div>
        <div className="infoTab">{blog.author}</div>
        <div className="infoTab-all">{blog.url}</div>
        <div className="infoTab-all">{blog.likes}{user && <button onClick={handleLike}>like</button>}</div>

        <div className="infoTab-all">{blog.user.name}</div>

        {user && blog.user.username === user.username &&
          <button onClick={handleRemove}>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog