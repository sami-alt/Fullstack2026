import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  const sorted = blogs.toSorted((a, b) => b.likes - a.likes)

  return (
    <>
      {sorted.map(blog =>
        <div key={blog.id} className='blog'>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      )}
    </>
  )
}

export default Blogs