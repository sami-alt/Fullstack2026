import Blog from "./Blog";

const Blogs = ({blogs, setBlogs ,like}) => {

    const sorted = blogs.toSorted((a,b) => b.likes - a.likes)
    console.log('sorted',sorted)

    return (
        <>                                                                 
            {sorted.map(blog =><Blog key={blog.id} blog={blog} like={like} blogs={blogs} setBlogs={setBlogs}/>)}
        </>
    )
}

export default Blogs