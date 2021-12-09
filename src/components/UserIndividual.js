/* import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { BrowserRouter as useParams } from "react-router-dom"

const User = () => {
  const user = useSelector(state => state.users)
  const dispatch = useDispatch()
  const user_rendered = user.total.filter(user => user.id !== id)
  
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  if (!user||!id) {
    return null
  }

  return(
    <div>
       <h2>{user_rendered.name}</h2>
       <h3>added blogs</h3>
       <ul>
       {user_rendered.blogs.map(blog=> 
        <li>{blog.title}</li>
        )}
        </ul>
    </div>    
  )
} 

export default User */