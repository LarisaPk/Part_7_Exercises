const initialState = {
  message:'',
  messageStyle: ''
}
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    return {
      message: action.message,
      messageStyle: action.messageStyle,
    }
  case 'REMOVE_MESSAGE':
    return ''
  default:
    return state
  }
}
export const setMessage = (message, messageStyle, time) => {
  return async dispatch => {
    await
    dispatch({
      type: 'SET_MESSAGE',
      message,
      messageStyle
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_MESSAGE'
      })
    }, time*1000)
  }
}
export const removeMessage = ()  => {
  return {
    type: 'REMOVE_MESSAGE'
  }
}
export default notificationReducer