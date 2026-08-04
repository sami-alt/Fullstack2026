const assert = require('assert')
const { test, beforeEach, after, describe } = require('node:test')
const mongoose = require('mongoose')
const utils = require('./test_utils')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)



beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(utils.testBlogs)
})

describe('Initial DB tests', async () => {
  test('Correct amount of posts from db and Content-type JSON', async () => {
    const posts = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(posts.body.length, 4)
  })

  test('check id attribute of blog object', async () => {
    const post = (await api.get('/api/blogs')).body[0]
    const hasId = post.hasOwnProperty('id')
    assert.strictEqual(hasId, true)
  })

  test('adding post to db', async () => {
    const testPost = {
      title:'Latest blog',
      author:'T. ester',
      url:'www.fromTheFuture.fu',
      likes:4
    }

    await api.post('/api/blogs')
      .send(testPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const posts = (await api.get('/api/blogs')).body.length

    assert.strictEqual(posts, 5)

  })

  test('has likes property if not then default to 0', async () => {
    const testPost = {
      title:'Latest blog',
      author:'T. ester',
      url:'www.fromTheFuture.fu',
    }

    const created = await api.post('/api/blogs')
      .send(testPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const hasLikes = created.body.hasOwnProperty('likes')
    assert.strictEqual(hasLikes, true)
  })

  test('has title and url properties else status 400', async () => {
    const testPost = {
      author:'T. ester',
      likes: 4
    }

    await api.post('/api/blogs')
      .send(testPost)
      .expect(400)

  })

  test('post can be deleted from db', async () => {
    const initPosts = (await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)).body

    const blogsBefore = initPosts.length
    const postToDelete = initPosts[0]
    await api.delete(`/api/blogs/${postToDelete.id}`).expect(204)
    const blogsAfter = (await api.get('/api/blogs').expect(200)).body.length

    assert.strictEqual(blogsAfter, (blogsBefore - 1))
  })


  test('update post in db', async () => {
    const toUpdate = (await api.get('/api/blogs')).body[0]

    const updated = {
      title: 'Test for blog apps',
      author: 'B. Virtanen',
      url: 'www.bvirta.fi',
      likes: 0,
    }

    const back = (await api.put(`/api/blogs/${toUpdate.id}`)
      .send(updated)).body


    const check = (await api.get('/api/blogs')).body[0]

    assert.strictEqual(check.likes, 0)
  })

})


after( async () => await mongoose.connection.close())