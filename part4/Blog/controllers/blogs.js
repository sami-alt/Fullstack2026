const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

//reduntant
const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', userExtractor ,async (request, response) => {
  const body = request.body

  console.log('token', request.token)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'})
  }

  const owner = await User.findById(request.user.id)
  if (!body.title || !body.url)
    return response.status(400).end()

  const blog = new Blog({
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes ?? 0,
    user: owner.id
  })
  
  const newBlog = await blog.save()
  
  owner.blogs = owner.blogs.concat(newBlog._id.toString())
  await owner.save()
 
  response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', userExtractor ,async (request, response ) => {
  const id = request.params.id
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'})
  }
  
  const blogToDelete = await Blog.findById(id)
  console.log(blogToDelete)
  if (blogToDelete.user.toString() !== request.user.id)
    return response.status(401).json({error: "user not creator of the post"})
  
  await Blog.findByIdAndDelete(id)
  
  
  response.status(204).end()
})

blogsRouter.delete('/', async (req,res) => {
  await Blog.deleteMany({})
  res.status(200).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { author, title ,url, likes } = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'})
  }


  const updated = await Blog.findById(request.params.id)

  if (!updated)
    return response.status(404).end()

  updated.author = author
  updated.title = title
  updated.url = url
  updated.likes = likes
  const up = await updated.save()
  response.status(200).json(up)
})

module.exports = blogsRouter