import React, { useState } from 'react'
import { Container, Row, Form, Col, Navbar, Nav, NavDropdown, Table, Button } from 'react-bootstrap'

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
            writer: newAuthor,
        })  
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }


    return (
      <div>
        <Form>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title: </Form.Label>
          <Form.Control as="textarea" rows={3} type="title" value={newTitle} onChange={handleTitleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAuthor">
          <Form.Label>Author: </Form.Label>
          <Form.Control type="author" value={newAuthor} onChange={handleAuthorChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formUrl">
          <Form.Label>Url: </Form.Label>
          <Form.Control type="url" value={newUrl} onChange={handleUrlChange}/>
        </Form.Group>
        <button type="submit" variant="primary" onClick={addBlog}>create</button>
        </Form>  
      </div>
    )
  }

export default BlogForm  