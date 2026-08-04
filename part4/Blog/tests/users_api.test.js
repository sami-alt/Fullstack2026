const bcrypt = require('bcrypt')
const User = require('../models/users')
const { test, after, describe } = require('node:test')
const assert = require('node:assert')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')

describe('user test', () => {
  test('add user to db', async () => {

    const newUser = {
      username: 'testUser',
      name: 'test',
      password: 'password'
    }
    
    const rest = await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
    const userInDB = (await api.get('/api/users')).body.length
    console.log(userInDB)
    assert.strictEqual(userInDB, 1)
  })
})

after( async () => await mongoose.connection.close())