import { useState } from "react"
import blogsServices from "../services/blogsServices"

const AddBlog = () => {
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

    const newBlog = () => {
        //event.preventDefault()
        blogsServices.addBlog({title:title, author:author, url:url})
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