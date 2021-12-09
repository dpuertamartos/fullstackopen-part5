import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'

const Users = () => {
  const user = useSelector(state => state.users)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])
  
  return(
    <div>
        <h2>Users</h2>
        <table>
           <thead> 
            <tr>
                <th></th>
                <th>Blogs created</th>
            </tr>  
            </thead>
            <tbody>
        {user.total.map(user => 
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
            </tr>
        )}
            </tbody>
        </table>
  </div>    
  )
} 

export default Users