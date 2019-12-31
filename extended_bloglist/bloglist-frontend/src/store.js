import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import togglableReducer from './reducers/togglableReducer'
import notificationReducer from './reducers/notificationReducer'
import  blogsReducer  from './reducers/blogsReducer'
import  userReducer  from './reducers/userReducer'
import  usersReducer  from './reducers/usersReducer'

const reducer = combineReducers({
  toggle: togglableReducer,
  notification: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
  users: usersReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store