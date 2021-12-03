import React, {useState} from 'react'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [visible, setVisible] = useState(false)
  
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="showAlways">
        {props.blog.title} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="showClick">
        {props.blog.title} <button onClick={toggleVisibility}>hide</button>
        <div className="url">{props.blog.url}</div>
        <div>Likes: {props.blog.likes} <button onClick={props.addlike}>Like</button></div>
        <div>Posted by: {props.blog.author.name}</div>
        {props.user.username === props.blog.author.username
        ? <div><button onClick={props.delBlog}>Remove</button></div>
        : <span></span>
        }
      </div>
    </div>
  )
} 

export default Blog
