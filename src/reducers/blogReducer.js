import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
      switch(action.type){
        case 'NEW_BLOG':
          return [...state, action.data]
        case 'INIT_BLOGS':
          return action.data 
        case 'LIKE':
            const id = action.data.id
            const blogToLike = state.find(blog => blog.id === id) 
            const blogLiked = {...blogToLike, likes: blogToLike.likes+1 }  
            return state.map(blog => blog.id !== id ? blog : blogLiked)
        default: 
          return state  
      }
  }


export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({ 
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}  


export const createBlog = content => {
    return async dispatch => {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
    }
  }

export const addLikeOf = (blog) => {
    return async dispatch => { 
        const updatedBlog = await blogService.update(blog.id, blog)
        dispatch({
            type: 'LIKE',
            data: {id:  blog.id}
        })
    }
}  

export default blogReducer  