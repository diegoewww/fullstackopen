import React from 'react';
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import BlogForm from './components/BlogForm'
import ToogleForm from './components/ToogleForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [message, setMessage] = useState({ type: null, text: null });
  const BlogFormRef = useRef()

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll();
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage({ type: 'error', text: `${error.response.data.error}` });
      setTimeout(() => {
        setMessage({ type: null, text: null });
      }, 5000);
    }
  }
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleNewBlog = async (note) => {
    BlogFormRef.current.toogleVisible()
    try {
      const result = await blogService.create(note);
      console.log(result);
      setBlogs(blogs.concat(result));
      setTitle('');
      setUrl('');
      setAuthor('');
      setMessage({
        type: 'success',
        text: `a new blog ${result.title} by ${result.author} added`,
      });
      setTimeout(() => {
        setMessage({ type: null, text: null });
      }, 3000);
    } catch (error) {
      setMessage({ type: 'error', text: `Error creating blog ${error.message}` });
      setTimeout(() => {
        setMessage({ type: null, text: null });
      }, 5000);
    }
  };

  const handleLike = async (id) => {
    const findBlogToUpdate = blogs.find((element) => element.id === id);
    const changedBlog = { ...findBlogToUpdate, likes: findBlogToUpdate.likes + 1 };

    try {
      const updatedBlog = await blogService.updateLike(id, changedBlog);
      setBlogs((prevBlogs) =>
        prevBlogs
          .filter((blog) => blog.id !== id) // Remueve el blog antiguo
          .concat(updatedBlog) // Agrega el blog actualizado
          .sort((a, b) => b.likes - a.likes)) // Ordena nuevamente por likes
    } catch (error) {
      setMessage({ type: 'error', text: `Error updating blog likes ${error.message}` });
      setTimeout(() => {
        setMessage({ type: null, text: null });
      }, 5000);
    }
  }

  const handleDelete = async (id) => {
    try {
      const blogToDelete = blogs.find(blog => blog.id === id);

      const shouldDelete = window.confirm(`Remove "${blogToDelete.title}" by ${blogToDelete.author}?`);

      if (shouldDelete) {
        await blogService.deleteNote(id);
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
      }
    } catch (error) {
      console.error('Error deleting blog:', error.message);
      setMessage({ type: 'error', text: 'Error deleting blog' });
    }
  };

  const loginForm = () => {
    return (
      <div>
        <h1>Log in to app</h1>
        <Message messageType={message.type} messageText={message.text} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              id="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">Login</button>
        </form>
      </div>
    )
  }

  const blogsList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Message messageType={message.type} messageText={message.text} />
        <div>
          <span>{user.name} logged in </span>
          <button onClick={handleLogout}>logout</button>
        </div>
        <ToogleForm buttonLabel='New Blog' ref={BlogFormRef}>
          <BlogForm handleNewBlog={handleNewBlog} />
        </ToogleForm>
        <div>
          {blogs.map(blog => {
            return <Blog key={blog.id} blog={blog} handleLike={handleLike}
              handleDelete={handleDelete} user={user} />
          })
          }
        </div>
      </div>
    )
  }

  return (
    <div>
      {
        user === null ?
          loginForm() :
          blogsList()
      }
    </div>
  )
}

export default App