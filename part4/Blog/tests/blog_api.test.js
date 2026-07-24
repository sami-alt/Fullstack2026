const assert = require('assert')
const {test, beforeEach, after, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const utils = require('./test_utils')
const Blog = require('../models/blog')
const blogsRouter = require('../controllers/blogs')
const { before } = require('lodash')
const config = require('../utils/config')
const api = supertest(app)



beforeEach(async ()=> {
    await Blog.deleteMany({})
    await Blog.insertMany(utils.testBlogs)
})


describe('Initial DB tests', async ()=> {
    test("Correct amount of posts from db and Content-type JSON", async ()=> {
        const posts = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(posts.body.length, 4)
    })

    test('check id attribute of blog object', async ()=> {
        const post = (await api.get('/api/blogs')).body[0]
        assert.strictEqual(post.hasOwnProperty('id'), true)
    })

    test('adding post to db', async ()=>{
        const testPost = {   
            title:"Latest blog",
            author:"T. ester",
            url:"www.fromTheFuture.fu",
            likes:4
        }

        await api.post('/api/blogs')
        .send(testPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const posts = (await api.get('/api/blogs')).body.length

        assert.strictEqual(posts, 5)

    })
    
})


after( async () => await mongoose.connection.close())