import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const reducerFinal = combineReducers({
    notifications: notificationReducer,
    blogs: blogReducer
})
const store1 = createStore(reducerFinal, composeWithDevTools(applyMiddleware(thunk)))

export default store1