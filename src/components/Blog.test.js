import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('Renders content and always show title but not url and likes', () => {
  const blog = {
    title: 'This is the title',
    author: {name: 'This is the autor', username: 'This is the autor'},
    url: 'This is the url',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} user={blog.author}/>
  )

  expect(component.container.querySelector('.showAlways')).toHaveTextContent(
    'This is the title')
  
  expect(
    component.container.querySelector('.showClick')
  ).toHaveStyle('display: none')  
})

