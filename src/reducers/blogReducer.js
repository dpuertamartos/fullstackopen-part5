import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
      switch(action.type){
        case 'NEW_BLOG':
          return [...state, action.data]
        case 'NEW_COMMENT':
            const id3 = action.data.id
            const blogToAddComment = state.find(blog => blog.id === id3) 
            const blogWithCommentAdded = {...blogToAddComment, comment: blogToAddComment.comment.concat(action.data.comment)}
            return state.map(blog => blog.id !== id3 ? blog : blogWithCommentAdded) 
        case 'INIT_BLOGS':
          return action.data 
        case 'LIKE':
            const id = action.data.id
            const blogToLike = state.find(blog => blog.id === id) 
            const blogLiked = {...blogToLike, likes: blogToLike.likes+1 }  
            return state.map(blog => blog.id !== id ? blog : blogLiked)
        case 'DELETE':
            const id2 = action.data.id
            return state.filter(blog => blog.id !== id2)    
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
        await blogService.update(blog.id, blog)
        dispatch({
            type: 'LIKE',
            data: {id:  blog.id}
        })
    }
}  

export const addCommentOf = (blogid, comment) => {
  return async dispatch => { 
      const newComment = await blogService.comment(blogid, comment)
      dispatch({
          type: 'NEW_COMMENT',
          data: {id: blogid, comment: newComment}
      })
  }
}  

export const deleteBlog = (idToDelete) => {
    return async dispatch => { 
        await blogService.del(idToDelete)
        dispatch({
            type: 'DELETE',
            data: {id: idToDelete}
        })
    }
}  

export default blogReducer  