const testRouter = require('express').Router()
const User = require('../models/users')
const Blogs = require('../models/blog')

testRouter.post('/reset', async (request, response) => {
    console.log('aaaa')
    await User.deleteMany({})
    await Blogs.deleteMany({})

    response.status(204).end()
})

module.exports = testRouter