import React, { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
    const [newTitle, setNewTitle] = useState('') 
    const [newAuthor, setNewAuthor] = useState('') 
    const [newUrl, setNewUrl] = useState('')

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

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: user,
            url: newUrl,
        })  
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }


    return (
      <div>
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
      </div>
    )
  }

export default BlogForm  