import { useState } from "react"
import blogsServices from "../services/blogsServices"

const AddBlog = ({setMessage, blogs ,setBlogs}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthor = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrl = (event) => {
        setUrl(event.target.value)
    }

    const newBlog = async () => {
        event.preventDefault()
        if (title.length < 1 || author.length < 1 || url.length < 1){
            setMessage({msg: 'title, author or length can not be empty', status:'error'})
            return
        }
        try{
           const newBlog = await blogsServices.addBlog({title:title, author:author ,url:url})
           setBlogs(blogs.concat(newBlog))
           setMessage({msg:'Blog post added', status:'success'})
        }catch(error){
            setMessage({msg:error.response.data.error, status:'error'})
        }
    }

    return (
        <form onSubmit={newBlog}>
            title
            <input onChange={handleTitle}></input><br/>
            author
            <input onChange={handleAuthor}></input><br/>
            url
            <input onChange={handleUrl}></input><br/>
            <button type="submit">Add post about blog</button>
        </form>
    )
}

export default AddBlog