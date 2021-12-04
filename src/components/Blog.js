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
      <div className="blog">
        <div style={hideWhenVisible} className="showAlways">
          <span id={props.blog.title}>{props.blog.title} <button onClick={toggleVisibility}>view</button></span>
        </div> 
        <div style={showWhenVisible} className="showClick">
          {props.blog.title} <button onClick={toggleVisibility}>hide</button>
          <div className="url">{props.blog.url}</div>
          <div>Likes: {props.blog.likes} <button onClick={props.addlike}>Like</button></div>
          <div>Posted by: {props.blog.writer}</div>
          {props.user !== null && props.user.username === props.blog.author.username
          ? <button onClick={props.delblog}>Remove</button>
          : <span></span>
          }
        </div>
      </div>
      </div>
      
  )
} 

export default Blog
