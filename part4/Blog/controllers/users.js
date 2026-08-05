const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const user = require('../models/users')


usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (password.length < 3)
    return res.status(400).json({error: 'name and password need to be atleast 3 characthers long'})

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const userToBeAdded = new user({
    username,
    name,
    passwordHash
  })

  const savedUser = await userToBeAdded.save()
  
  res.status(201).json(savedUser)

})

usersRouter.get('/', async (req, res) => {
    const users = await user.find({}).populate('blogs')
    res.json(users)
})

module.exports = usersRouter