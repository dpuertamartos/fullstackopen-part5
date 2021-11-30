import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
  const [newTitle, setNewTitle] = useState('') 
  const [newAuthor, setNewAuthor] = useState('') 
  const [newUrl, setNewUrl] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(null)

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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: user.name,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log(returnedBlog)
        console.log(returnedBlog.author.name)
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setErrorMessage(`a new blog ${returnedBlog.title} by ${blogs.at(-1).author.name} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    
  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>Title:
      <input
        type="title"
        value={newTitle}
        name="title"
        onChange={handleTitleChange}
      />
      </div>
      <div>Author:
      <input
        type="author"
        value={newAuthor}
        name="author"
        onChange={handleAuthorChange}
      />
      </div>
      <div>Url:  
      <input
        type="url"
        value={newUrl}
        name="url"
        label="url"
        onChange={handleUrlChange}
      />
      </div>
      <button type="submit">create</button>
    </form>  
  )

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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App