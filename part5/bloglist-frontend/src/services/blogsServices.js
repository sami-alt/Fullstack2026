import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const loggedUserJSON = window.localStorage.getItem('loggedInUser')

if (loggedUserJSON) {
  const loggedUser = JSON.parse(loggedUserJSON)
  token = `Bearer ${loggedUser.token}`
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const addBlog = async (newPost) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newPost, config)
  return response.data
}


const updateBlog = async (updatedPost, id) => {
  const config = {
    headers: { Authorization: token }
  }
  const updateUrl = baseUrl + '/' + id
  const response = await axios.put(updateUrl, updatedPost, config)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const deletePost = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const removeUrl = baseUrl + '/' + id
  const response = await axios.delete(removeUrl, config)
  return response.data
}


export default { getAll, addBlog, setToken, updateBlog, deletePost }