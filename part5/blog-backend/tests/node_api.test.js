const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app.js');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

// Configuración inicial para las pruebas
beforeEach(async () => {
  await User.deleteMany({});

  for (const user of helper.initialUsers) {
    await new User(user).save();
  }

  await Blog.deleteMany({});

  for (const blog of helper.initialBlogs) {
    await new Blog(blog).save();
  }
 
});

// Operaciones GET
describe('GET /api/blogs', () => {
  test('Returns blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('There are 3 blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('Confirms title "El Gran Chef"', async () => {
    const response = await api.get('/api/blogs');
    const titles = response.body.map(r => r.title);
    expect(titles).toContain('El Gran Chef');
  });

  test('Changing format _id to id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});

// Operación POST
describe('POST /api/blogs', () => {
  test('Creates a new unique blog', async () => {

    const userToLogin = {
      username:"diego",
      name:"Diego Nina",
      password:"hellas"
    }

    const response = await api.post('/api/login').send(userToLogin).expect(200)
    expect(response.body.username).toBe('diego')

    const newBlog = {
      title: 'token',
      author: 'token slug',
      url: 'token.com',
      likes: 3,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization' ,`bearer ${response.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    const blogsEnd = await helper.blogsInDb();
    expect(blogsEnd).toHaveLength(helper.initialBlogs.length + 1);
    const author = blogsEnd.map(b => b.author);
    expect(author).toContain('token slug');
  });

  test('Defaults likes to 0', async () => {

    const userToLogin = {
      username:"diego",
      name:"Diego Nina",
      password:"hellas"
    }

    const response = await api.post('/api/login').send(userToLogin).expect(200)
    expect(response.body.username).toBe('diego')

    const newBlog = {
      title: 'sin likes',
      author: 'Likeoncio',
      url: 'likes.com',
    };

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization' ,`bearer ${response.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(result.body.likes).toBe(0);
  });

  test('Missing title and url properties', async () => {

    const userToLogin = {
      username:"diego",
      name:"Diego Nina",
      password:"hellas"
    }

    const response = await api.post('/api/login').send(userToLogin).expect(200)
    expect(response.body.username).toBe('diego')

    const newBlog = {
      author: 'Faltan Datos',
    };

    await api.post('/api/blogs')
    .send(newBlog)
    .set('Authorization' ,`bearer ${response.body.token}`)
    .expect(400);


  });

});

describe('DELETE api/blogs', ()=>{
  test('Eliminar un solo recurso', async()=>{

    const userToLogin = {
      username:"diego",
      name:"Diego Nina",
      password:"hellas"
    }

    const response = await api.post('/api/login').send(userToLogin).expect(200)
    expect(response.body.username).toBe('diego')

    const newBlog = {
      title: 'token',
      author: 'token slug',
      url: 'token.com',
      likes: 3,
    };

    const newpost = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization' ,`bearer ${response.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

      console.log(newpost)

    await api.delete(`/api/blogs/${newpost.body.id}`)
    .set('Authorization' ,`bearer ${response.body.token}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    
  })
})

describe('PUT api/blogs', ()=>{
  test('Actualizando un solo recurso', async()=>{

    const allblogs = await helper.blogsInDb()
    const idToUpdate = allblogs[0].id

    const newBlog = {
      title: "updated El Gran Chef",
      author: "updated PELAEZ",
      url: "updated GRANCHEF.COM",
      likes: 4
    }

    const result = await api.put(`/api/blogs/${idToUpdate}`).send(newBlog).expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    expect(result.body.likes).toBe(4)

  })
})

// Configuración final para las pruebas
afterAll(() => {
  mongoose.connection.close();
});
