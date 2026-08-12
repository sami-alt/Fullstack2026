import { useState } from "react"

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)

  return(
      <div className="blogStyle">
        <div className= {show ? 'hide' : ''}  >{blog.title} {blog.author}<button onClick={()=> setShow(!show)}>{show ? 'hide' : 'view'}</button></div>  
        <div className={show ? 'show' : 'hide'}>
          <div className="infoTab" >{blog.title}<button onClick={()=> setShow(!show)}>{show ? 'hide' : 'view'}</button></div>
          <div className="infoTab" >{blog.author}</div>
          <div className="infoTab" >{blog.url}</div>
          <div className="infoTab" >{blog.likes} <button>like</button></div>
        </div>
        
      </div>
  )
  
}

export default Blog