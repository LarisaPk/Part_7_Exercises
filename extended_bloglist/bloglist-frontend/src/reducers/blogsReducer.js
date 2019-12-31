import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sorted = blogs.sort(function(a, b){return a.likes - b.likes}).reverse()
    dispatch({
      type: 'INIT_BLOGS',
      data: sorted,
    })
  }
}
const blogsReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}
export default blogsReducer