import userService from '../services/users'

export const initializeAllUsers =() => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_ALL_USERS',
      data: users,
    })
  }
}
const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_ALL_USERS':
    return action.data
  default:
    return state
  }
}
export default userReducer