const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const user = require('../models/users')


usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  console.log(passwordHash)
  const userToBeAdded = new user({
    username,
    name,
    passwordHash
  })

  const savedUser = await userToBeAdded.save()
  
  res.status(201).json(savedUser)

})

usersRouter.get('/', async (req, res) => {
    const users = await user.find({})
    res.json(users)
})

module.exports = usersRouter