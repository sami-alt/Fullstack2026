import Blog from "./Blog";


const Blogs = ({blogs, user, setUser}) => {
    return (
        <>
            <h2>Blogs</h2>
            {user.name}
            <button onClick={() => {setUser(null), window.localStorage.removeItem('loggedInUser')}}>logout</button>
                                                                               
            <div> </div>
            {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
        </>
    )
}

export default Blogs