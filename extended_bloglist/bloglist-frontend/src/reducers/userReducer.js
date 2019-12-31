import blogService from '../services/blogs'

export const setUser = user => {
  return {
    type: 'SET_USER',
    data: user,
  }
}
export const initializeUser =() => {
  const loggedUserJSON =  window.localStorage.getItem('loggedUser')
  const user = JSON.parse(loggedUserJSON)
  if (loggedUserJSON)
    blogService.setToken(user.token)
  return {
    type: 'INIT_USER',
    data: user
  }
}
const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'INIT_USER':
    return action.data
  default:
    return state
  }
}
export default userReducer