import { useState } from 'react'

const Blog = ({ blog, like, deletePost }) => {
  const [show, setShow] = useState(false)
  //console.log(blog)
  const handleLike = () => {
    event.preventDefault()
    like({ user:blog.user.id,
      author:blog.author,
      title:blog.title,
      url:blog.url,
      likes: blog.likes + 1
    }, blog.id)

  }

  const handleRemove = () => {
    event.preventDefault()
    deletePost(blog.id)
  }

  return(
    <div className="blogStyle">
      <div className= {show ? 'hide' : ''}  >{blog.title} {blog.author}<button onClick={() => setShow(!show)}>{show ? 'hide' : 'view'}</button></div>
      <div className={show ? 'show' : 'hide'}>
        <div className="infoTab" >{blog.title}  {blog.author}<button onClick={() => setShow(!show)}>{show ? 'hide' : 'view'}</button></div>
        <div className="infoTab" >{blog.url}</div>
        <div className="infoTab" >{blog.likes} <button onClick={handleLike}>like</button></div>
        <div className="infoTab" >{blog.user.name}</div>
        <button onClick={handleRemove}>remove</button>
      </div>

    </div>
  )

}

export default Blog