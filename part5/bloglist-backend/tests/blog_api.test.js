const assert = require('assert')
const { test, beforeEach, after, describe } = require('node:test')
const mongoose = require('mongoose')

const Blog = require('../models/blog')
const User = require('../models/users')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  await api.post('/api/users').send({ username:'Tester1', name:'John', password:'Password1' })
  await api.post('/api/users').send({ username:'Tester2', name:'Smith', password:'Password2' })

  const testPost1 = {
    title:'Test blog vol.1',
    author:'T. ester',
    url:'www.fromTheFuture.fu',
    likes:1
  }
  const testPost2 = {
    title:'Test blog vol.2',
    author:'B. ester',
    url:'www.blogs.fi',
    likes:2
  }
  const testPost3 = {
    title:'Test blog vol.3',
    author:'W. ester',
    url:'www.example.com',
    likes:3
  }
  const testPost4 = {
    title:'Test blog vol.4',
    author:'F. ester',
    url:'www.web.net',
    likes:67
  }

  const user1 = await api.post('/api/login').send({ username:'Tester1',password:'Password1' })
  const user2 = await api.post('/api/login').send({ username:'Tester2',password:'Password2' })

  await api.post('/api/blogs')
    .set('Authorization', 'Bearer ' + `${user1._body.token}`)
    .send(testPost1)
    .expect(201)

  await api.post('/api/blogs')
    .set('Authorization', 'Bearer ' + `${user2._body.token}`)
    .send(testPost2)
    .expect(201)

  await api.post('/api/blogs')
    .set('Authorization', 'Bearer ' + `${user1._body.token}`)
    .send(testPost3)
    .expect(201)

  await api.post('/api/blogs')
    .set('Authorization', 'Bearer ' + `${user2._body.token}`)
    .send(testPost4)
    .expect(201)

})


describe('Initial DB tests', async () => {
  test('Correct amount of posts from db and Content-type JSON', async () => {
    const posts = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(posts.body.length, 4)
  })

  test('check id attribute of blog object', async () => {
    const user1 = await api.post('/api/login').send({ username:'Tester1',password:'Password1' })
    const post = await api.post('/api/blogs')
      .set('Authorization', 'Bearer ' + `${user1._body.token}`)
      .send({ title:'Test ID vol.19',author:'I. Dester',url:'www.id.fi',likes:0 })
      .expect(201)

    const hasId = post.body.id ? true : false
    assert.strictEqual(hasId , true)
  })

  test('adding post to db', async () => {

    const postsBefore = (await api.get('/api/blogs'))._body.length

    const testPost = {
      title:'Latest blog',
      author:'T. ester',
      url:'www.fromTheFuture.fu',
      likes:4
    }

    const user1 = await api.post('/api/login').send({ username:'Tester1',password:'Password1' })
    await api.post('/api/blogs')
      .set('Authorization', 'Bearer ' + `${user1._body.token}`)
      .send(testPost)
      .expect(201)

    const postsAfter = (await api.get('/api/blogs'))._body.length

    assert.strictEqual(postsBefore + 1, postsAfter)
  })

  test('has likes property if not then default to 0', async () => {
    const testPost = {
      title:'Latest blog',
      author:'T. ester',
      url:'www.fromTheFuture.fu',
    }

    const user1 = await api.post('/api/login').send({ username:'Tester1',password:'Password1' })
    const post = await api.post('/api/blogs')
      .set('Authorization', 'Bearer ' + `${user1._body.token}`)
      .send(testPost)
      .expect(201)

    const hasLikes = post._body.likes !== undefined  ? true : false
    assert.strictEqual(hasLikes, true)
  })

  test('has title and url properties else status 400', async () => {
    const testPost = {
      author:'T. ester',
      likes: 4
    }

    const user1 = await api.post('/api/login').send({ username:'Tester1',password:'Password1' })
    await api.post('/api/blogs')
      .set('Authorization', 'Bearer ' + `${user1._body.token}`)
      .send(testPost)
      .expect(400)

    const testPost2 = {
      url:'www.noTitle.com',
      likes: 4
    }

    await api.post('/api/login').send({ username:'Tester1',password:'Password1' })
    await api.post('/api/blogs')
      .set('Authorization', 'Bearer ' + `${user1._body.token}`)
      .send(testPost2)
      .expect(400)
  })

  test('post can be deleted from db', async () => {
    const blogs = (await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/))._body

    const blogsBefore = blogs.length
    const postToDelete = blogs[0].id

    const user1 = await api.post('/api/login').send({ username:'Tester1',password:'Password1' })
    await api.delete(`/api/blogs/${postToDelete}`)
      .set('Authorization', 'Bearer ' + `${user1._body.token}`)
      .expect(204)

    const blogsAfter = (await api.get('/api/blogs').expect(200))._body.length
    assert.strictEqual(blogsAfter, (blogsBefore - 1))
  })



  test('update post in db', async () => {
    const toUpdate = (await api.get('/api/blogs'))._body[0]

    const testPost1 = {
      title:'Test blog vol.1',
      author:'T. ester',
      url:'www.fromTheFuture.fu',
      likes:100000000
    }

    const user1 = await api.post('/api/login').send({ username:'Tester1',password:'Password1' })
    await api.put(`/api/blogs/${toUpdate.id}`)
      .set('Authorization', 'Bearer ' + `${user1._body.token}`)
      .send(testPost1)
      .expect(200)

    const check = (await api.get`/api/blogs`)._body[0]
    assert.strictEqual(check.likes, 100000000)
  })


})

after( async () => await mongoose.connection.close())