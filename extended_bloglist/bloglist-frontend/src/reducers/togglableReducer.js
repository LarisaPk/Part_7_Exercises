const togglableReducer = (state = false, action) => {
  switch(action.type) {
  case 'CHANGE_VISIBILITY':
    return !state
  default:
    return  state
  }
}
export const setVisibility = () => {
  return {
    type: 'CHANGE_VISIBILITY',
  }
}
export default togglableReducer