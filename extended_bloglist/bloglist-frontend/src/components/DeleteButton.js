import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import { withRouter } from 'react-router-dom'
import { setMessage } from '../reducers/notificationReducer'
import { Button, Icon } from 'semantic-ui-react'

const DeleteButton = (props) => {
  const blog = props.blog
  const user = props.user

  const removeBlog = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      props.initializeBlogs()
      props.history.push('/')
      props.setMessage(`blog ${blog.title} was deleted`, 'ui success message', 5)
    }
  }
  if (user.username===blog.username) {
    return (
      <Button id='delete' negative icon onClick={removeBlog}>remove
        <Icon name='trash' />
      </Button>
    )
  }
  return (
    <></>
  )
}
DeleteButton.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = {
  initializeBlogs,
  setMessage
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DeleteButton))