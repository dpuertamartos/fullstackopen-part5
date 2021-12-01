import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Loginform'
import BlogForm from './components/Blogform'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login' 


const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }
  else if (message !== null && isError === null){
    return (
      <div className="notification">
        {message}
      </div>
    )
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blog ${returnedBlog.title} by ${blogs.at(-1).author.name} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
  }

  const addLike = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = {...blog, likes: blog.likes+1}
    
    blogService.update(id, changedBlog)
      .then(returnedBlog => {
        console.log(JSON.stringify(returnedBlog))
        console.log(JSON.stringify(changedBlog))
        setBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog))
      })
      .catch( () => {
        setErrorMessage(
          `Blog '${blog.title}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(n => n.id !== id))
      })
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    setUsername('')
    setPassword('')
    setErrorMessage("Logged out")
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    window.localStorage.removeItem('loggedNoteappUser')
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch{
      console.log('Wrong credentials')
      setErrorMessage('Wrong credentials')
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
        setIsError(null)
      }, 5000)
    }
    
    /* catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000) 
    }*/
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  
  function compare(a,b) {
    if (a.likes > b.likes) return -1;
    if (b.likes > a.likes) return 1;

    return 0;
  }

  const sortedBlogs = blogs.sort(compare)

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} user={user.name}/>
    </Togglable>)

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} isError={isError} />
      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
        {blogForm()}
      </div>
      }
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} addlike={() => addLike(blog.id)} />
      )}
    </div>
  )
}

export default App