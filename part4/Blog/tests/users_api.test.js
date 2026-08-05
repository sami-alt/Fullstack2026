const bcrypt = require('bcrypt')
const User = require('../models/users')
const {describe, beforeEach, test, after } = require('node:test')
const assert = require('node:assert')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')

beforeEach(async ()=> {
    await User.deleteMany({})
})

describe('user test', () => {
  test('add user to db', async () => {

    const newUser = {
      username: 'testUser',
      name: 'test',
      password: 'password'
    }
    
    const rest = await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
    const userInDB = (await api.get('/api/users')).body.length

    assert.strictEqual(userInDB, 1)
  })
  test('do not allow duplicate usernames', async () => {
      const newUser = {
      username: 'test',
      name: 'test',
      password: 'password'
    }

    await api.post('/api/users').send(newUser).expect(201)
    
    const sameName = {
      username: 'test',
      name: 'test',
      password: 'password'
      }

    await api.post('/api/users').send(sameName).expect(400)

  })

  test('do not add user with username with less than 3 charachters', async () => {
     const newUser = {
      username: 'te',
      name: 'test',
      password: 'password'
    }
    await api.post('/api/users').send(newUser).expect(400)

  })

    test('do not add user with password with less than 3 charachters', async () => {
     const newUser = {
      username: 'test',
      name: 'test',
      password: 'pa'
    }
    await api.post('/api/users').send(newUser).expect(400)

  })

})

after( async () => await mongoose.connection.close())