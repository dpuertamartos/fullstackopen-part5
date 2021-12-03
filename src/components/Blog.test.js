import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Togglable blog content', () => {
    const blog = {
        title: 'This is the title',
        author: {name: 'This is the autor', username: 'This is the autor'},
        url: 'This is the url',
        likes: 0
      }
    
    let component

    beforeEach(() => {
        component = component = render(
            <Blog blog={blog} user={blog.author}/>
          )
    })

    test('Renders content and always show title but not url and likes', () => {

        expect(component.container.querySelector('.showAlways')).toHaveTextContent(
          'This is the title')
        
        expect(
          component.container.querySelector('.showClick')
        ).toHaveStyle('display: none')  
    })

    test('Show title url and likes when clicked', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
        
        expect(
          component.container.querySelector('.showClick')
        ).not.toHaveStyle('display: none')  
    })
})




