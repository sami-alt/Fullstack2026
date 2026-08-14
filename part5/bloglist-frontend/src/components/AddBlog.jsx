import { useState } from 'react'

const AddBlog = ({ setMessage, visible, setVisible, createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const hide = { display: visible ? '' : 'none' }

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
      setMessage({ msg: 'title, author or length can not be empty', status:'error' })
      return
    }
    createBlog({ title:title, author:author ,url:url })
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div style={hide}>
      <h2>create new post</h2>
      <form onSubmit={newBlog}>
                title
        <input onChange={handleTitle} id='title' placeholder='title'/><br/>
                author
        <input onChange={handleAuthor} id='author' /><br/>
                url
        <input onChange={handleUrl} id='url' /><br/>
        <button type="submit">Add post</button>
        <button type='button' onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}

export default AddBlog