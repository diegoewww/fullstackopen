const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "El Gran Chef",
    author: "PELAEZ",
    url: "GRANCHEF.COM",
    likes: 3
  },
  {
    title: "CS GO",
    author: "LOLITO",
    url: "CSGO.COM",
    likes: 2
  }, 
  {
    title: "VALITO",
    author: "RIOT GAME",
    url: "VALITO.COM",
    likes: 1
  }
]

const initialUsers = [
  {
    username:"diego",
    name:"Diego Nina",
    passwordHash:"$2b$10$KyJjkfpijIG8f1.Gf3w8fOo/pfAF4vhmC.OPTnp30yRTGBOcOeFQy"
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb
}