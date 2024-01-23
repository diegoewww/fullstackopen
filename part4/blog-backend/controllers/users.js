const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async(request,response)=>{
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author:1 })
  response.json(users)
})

usersRouter.post('/', async(request,response,next)=>{
  try {
    const body = request.body

    if (body.password.length < 3) {
      return response.status(400).json({ error: 'password must be at least 3 length' })
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password,saltRounds)

    const user = new User({
    name: body.name,
    username: body.username,
    passwordHash
   })

    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error) {
    next(error)
  }
  
})

module.exports = usersRouter