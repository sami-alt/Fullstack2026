import Blog from "./Blog";

const Blogs = ({blogs, setBlogs ,like, }) => {
    return (
        <>                                                                 
            {blogs.map(blog =><Blog key={blog.id} blog={blog} like={like} blogs={blogs} setBlogs={setBlogs}/>)}
        </>
    )
}

export default Blogs