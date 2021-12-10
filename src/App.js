import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Loginform'
import BlogForm from './components/Blogform'
import Togglable from './components/Togglable'
import Notification from './components/Notification' 
import Users from './components/User'
import { ChangeThenRemoveNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { addLikeOf, createBlog, deleteBlog, initializeBlogs } from './reducers/blogReducer'
import { initializeUsers, logUser, setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const user = useSelector(state => state.users)
  const [isError, setIsError] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const usersaved = JSON.parse(loggedUserJSON)
      dispatch(setUser(usersaved))
    }
  }, [dispatch])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(ChangeThenRemoveNotification('a new blog added', 5))
  }

  const delBlog = (id) => {
    if (window.confirm("do you want to delete it?")){
      dispatch(deleteBlog(id))
      dispatch(ChangeThenRemoveNotification("blog deleted"))
      console.log('blog deleted')

  }}

  const addLike = (id) => {
    const blog = blogs.find(b => b.id === id)
    console.log(blog)
    dispatch(addLikeOf(blog))
    dispatch(ChangeThenRemoveNotification(`Blog '${blog.title}' liked`, 5))
  }
  
  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedNoteappUser')
    setUsername('')
    setPassword('')
    dispatch(ChangeThenRemoveNotification(`Logged out`, 5))
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    dispatch(logUser(username, password))
    setUsername('')
    setPassword('')
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <span>
        <span style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </span>
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
      </span>
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

  const padding = {
    padding: 5
  }  

  const User = () => {
    const id3 = useParams().id
    const selectedUser = user.total.find(user => user.id === id3)
   
    if (!selectedUser||!id3) {
      return null
    }
    else{
      return(
        <div>
           <h2>{selectedUser.name}</h2>
           <h3>added blogs</h3>
            <ul>
           {selectedUser.blogs.map(blog=> 
            <li key={blog.id}>{blog.title}</li>
            )}
            </ul> 
        </div>    
      )
    }
  } 

  const BlogIndividual = () => {
    const id4 = useParams().idblog
    console.log(id4)
    const selectedBlog = blogs.find(blog => blog.id === id4)
    console.log(id4)
    console.log(selectedBlog)
   
    if (!selectedBlog||!id4) {
      return null
    }
    else{
      return(
        <div>
           <h2>{selectedBlog.title}</h2>
           <div><a href={selectedBlog.url}>{selectedBlog.url}</a></div>
           <div>{selectedBlog.likes} likes <button onClick={() => addLike(selectedBlog.id)}>Like</button></div>
           <div>added by {selectedBlog.author.username}</div>
           <div>wrote by {selectedBlog.writer}</div>
        </div>    
      )
    }
  } 


  return (
    <Router>
      <div className="menu">
        <span><Link style={padding} to="/">blogs</Link></span>
        <span><Link style={padding} to="/users">users</Link></span>
        <span>              
          {user.logged === null 
            ? loginForm() 
            :
              <span>
                <span>{user.logged.name} logged-in <button onClick={handleLogout}>Logout</button></span>
                
              </span>
          }
        </span>
      </div>
      <div className="loginFormulary">
        <h2>blogs app</h2>
              <Notification isError={isError} />
        <div>{blogForm()}</div>  
      </div>
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
            <Users />
        </Route>
        <Route path="/:idblog">
          <BlogIndividual />
        </Route>
        <Route path="/">
          <div>
            {sortedBlogs.map(blog =>
              <Blog key={blog.id} blog={blog} addlike={() => addLike(blog.id)} delblog={() => delBlog(blog.id)} user={user} />
            )}
          </div>
        </Route>
      </Switch>

    </Router>
  )
}

export default App