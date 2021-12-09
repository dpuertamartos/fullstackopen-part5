import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Loginform'
import BlogForm from './components/Blogform'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 
import { ChangeThenRemoveNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog, initializeBlogs } from './reducers/blogReducer'


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [isError, setIsError] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
    dispatch(createBlog(blogObject))
    dispatch(ChangeThenRemoveNotification('a new blog added', 5))
  }

  const delBlog = (id) => {
    if (window.confirm("do you want to delete it?")){
      blogService.del(id)
      .then(()=>{
        blogService.getAll().then(blogs =>{
          console.log('blog deleted')
          // setBlogs(blogs) 
          })

        })
      .catch((error)=>{
        dispatch(ChangeThenRemoveNotification(`${error}`, 5))
      })
    }
  }

  const addLike = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = {...blog, likes: blog.likes+1}
    
    blogService.update(id, changedBlog)
      .then(returnedBlog => {
        console.log(JSON.stringify(returnedBlog))
        console.log(JSON.stringify(changedBlog))
        // setBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog))
      })
      .catch( () => {
        dispatch(ChangeThenRemoveNotification(`Blog '${blog.title}' was already removed from server`, 5))
        // setBlogs(blogs.filter(n => n.id !== id))
      })
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    setUsername('')
    setPassword('')
    dispatch(ChangeThenRemoveNotification(`Logged out`, 5))
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
      dispatch(ChangeThenRemoveNotification(`Wrong credentials`, 5))
      setIsError(true)
    }
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
      <Notification isError={isError} />
      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
        {blogForm()}
      </div>
      }
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} addlike={() => addLike(blog.id)} delblog={() => delBlog(blog.id)} user={user} />
      )}
    </div>
  )
}

export default App