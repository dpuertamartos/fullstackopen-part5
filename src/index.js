import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store1 from './store'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'

blogService.getAll().then(blogs =>
    store1.dispatch(initializeBlogs(blogs))
)

ReactDOM.render(
  <Provider store={store1}>
    <App />
  </Provider>,
  document.getElementById('root')
)