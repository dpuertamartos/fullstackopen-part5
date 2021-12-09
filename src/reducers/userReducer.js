import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { ChangeThenRemoveNotification } from './notificationReducer'

const userReducer = ( state={logged: null ,total: []}, action) => {
    switch(action.type){
        case 'SET_USER_LOGGED':
          return {...state, logged: action.data}
        case 'INIT_USERS':
          return {...state, total: action.data}    
        default: 
          return state  
      }
}

export const logUser = (username, password) => {
    return async dispatch => {
        try{
            const loggedUser = await loginService.login({username, password})
            dispatch(ChangeThenRemoveNotification(`${username} logged in`, 5))
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(loggedUser)
            ) 
            blogService.setToken(loggedUser.token)
            dispatch({
                type: 'SET_USER_LOGGED',
                data: loggedUser,
            })
        }
        catch{
            dispatch(ChangeThenRemoveNotification(`Wrong credentials`, 5))
        }
    }
}

export const setUser = (user) => {
    return async dispatch => {
        if (user!==null){blogService.setToken(user.token)}
        dispatch({
            type: 'SET_USER_LOGGED',
            data: user,
        })
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({ 
            type: 'INIT_USERS',
            data: users,
        })
    }
} 
/* export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({ 
            type: 'INIT_USERS',
            data: users,
        })
    }
}  
 */

export default userReducer