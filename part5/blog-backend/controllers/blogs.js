const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
  // await Blog.deleteMany({});
  // response.send('borrados')
})

blogRouter.post('/', middleware.userExtractor, async(request, response) => {
  const body = request.body
  const userrq = request.user
  
  const user = await User.findById(userrq._id)

  if(!body.title || !body.author){
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const blogsaved = await blog.save()
  const blogsavedpuplate = await Blog.findOne(blogsaved).populate('user', { username: 1, name: 1 })
  user.blogs = user.blogs.concat(blogsaved._id)
  await user.save()
  response.json(blogsavedpuplate)
})

blogRouter.delete('/:id', middleware.userExtractor, async(request, response) => {
  const id = request.params.id

  const user = request.user
  const blog = await Blog.findById(id)

  if(user.id === blog.user.toString()){
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } else {
    return response.status(403).json({
      error: 'unauthorized access to delete the blog another user'
    });
  }

})

blogRouter.put('/:id', async(request, response) => {
  const id = request.params.id
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id
  }
  const blogUpdated = await Blog.findByIdAndUpdate(id, newBlog, { new: true, runValidators:true})
  .populate('user', { username: 1, name: 1 })

  response.status(200).json(blogUpdated)

})




module.exports = blogRouter