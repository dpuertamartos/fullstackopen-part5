import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './Blogform'


test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'testing of forms could be easier title' }
    })

    fireEvent.change(url, {
        target: { value: 'testing of forms could be easier url' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls[0])
    expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier title' )
    expect(createBlog.mock.calls[0][0].url).toBe('testing of forms could be easier url' )
})  
