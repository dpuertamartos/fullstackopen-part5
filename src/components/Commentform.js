import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ChangeThenRemoveNotification } from '../reducers/notificationReducer'

const CommentForm = () => {
    const [comment, setNewComment] = useState('')
    const dispatch = useDispatch()

    const addComment = (event) => {
        event.preventDefault()
        console.log("new comment")
        dispatch(ChangeThenRemoveNotification("new comment", 5))
      }
    
    const handleCommentChange = (event) => {
        console.log(event.target.value)
        setNewComment(event.target.value)
      }

    return(
        <div>
            <form onSubmit={addComment}>
              <div> 
                  <input
                      id="comment"
                      value={comment}
                      name="comment"
                      onChange={handleCommentChange}
                  />
                  <button type="submit">add comment</button>
              </div>
            </form>  
        </div>
    )
}

export default CommentForm
