const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')


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

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'})
  }

  const owner = await User.findById(decodedToken.id)
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

blogsRouter.delete('/:id', async (request, response ) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})



blogsRouter.put('/:id', async (request, response) => {
  const { author, title ,url, likes } = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
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