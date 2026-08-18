import { useState } from 'react'

const Blog = ({ blog, like, deletePost, user }) => {
  const [show, setShow] = useState(false)
  console.log('blog',blog, 'user',user)
  const handleLike = () => {
    event.preventDefault()
    like({ user:blog.user.id,
      author:blog.author,
      title:blog.title,
      url:blog.url,
      likes: blog.likes + 1
    }, blog.id)

  }

  const handleRemove = (event) => {
    event.preventDefault()
    deletePost(blog.id)
  }
  
  const handleViewAll = () => {
      setShow(!show)
  }
  console.log('names',blog.user.username === user.username )
  return( 
    <div className="blog">
      <div className={show ? 'all' : 'some'}>
        <div className="infoTab" >{blog.title} <button onClick={handleViewAll}>{show ? 'hide' : 'view'}</button></div>
        <div className="infoTab" >{blog.author}</div>
        {show && <>
        <div className="infoTab-all" >{blog.url}</div>
        <div className="infoTab-all" >{blog.likes} </div>
        <div><button onClick={handleLike}>like</button></div>
        <div className="infoTab-all" >{blog.user.name}</div>
        {(blog.user.username === user.username) &&
        <button onClick={handleRemove}>remove</button>
        }
        </>
      }
      </div>

    </div>
  )

}

export default Blog