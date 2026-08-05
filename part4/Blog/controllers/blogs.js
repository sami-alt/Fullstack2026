const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const owner = await User.find({})
  //console.log('owner',owner[0]._id.toString())
  if (!request.body.title || !request.body.url)
    return response.status(400).end()

  const blog = new Blog({
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes ?? 0,
    user: owner[0]._id.toString()
  })
  
  const found = await User.findById(owner[0]._id.toString())
  
  const newBlog = await blog.save()
  //console.log(newBlog._id.toString())
  console.log('found',found.blogs.concat(newBlog._id.toString()))
  found.blogs = found.blogs.concat(newBlog._id.toString())
  await found.save()
 
  response.status(201).json(newBlog)

})

blogsRouter.delete('/:id', async (request, response ) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})



blogsRouter.put('/:id', async (request, response) => {
  const { author, title ,url, likes } = request.body

  // console.log(request.params.id)
  const updated = await Blog.findById(request.params.id)
  //console.log('updated',updated)
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