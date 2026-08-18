import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, like, deletePost, user }) => {

  const sorted = blogs.toSorted((a,b) => b.likes - a.likes)

  return (
    <>
      {sorted.map(blog => <Blog key={blog.id} blog={blog} like={like} blogs={blogs} setBlogs={setBlogs} deletePost={deletePost} user={user}/>)}
    </>
  )
}

export default Blogs