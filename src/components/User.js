import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

const Users = () => {
  const user = useSelector(state => state.users)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  console.log(user.total)
  console.log(user.total[0])
  
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
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
            </tr>
        )}
            </tbody>
        </table>
  </div>    
  )
} 

export default Users