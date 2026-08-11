import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  //console.log('set token',token, newToken)
}

const addBlog = async (newPost) => {
  const config = {
    headers: {Authorization: token}
  }
  console.log('token',token)
  const response = await axios.post(baseUrl, newPost, config)
  return response.data
}


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getByUser = async (userName) => {
  
  const response = await axios.get(baseUrl)
  // console.log('data from server',response.data)
  //console.log('filter',response.data.filter(blog => blog.user.username === 'Tester1'))
  //console.log('username',userName)
  const byUser = response.data.filter(blog => blog.user.username === userName)
  return byUser
}

export default { getAll, getByUser, addBlog, setToken }