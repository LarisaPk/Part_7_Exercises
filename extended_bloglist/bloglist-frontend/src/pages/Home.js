import React from 'react'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Notification from '../components/Notification'
import Togglable from '../components/Togglable'
import { connect } from 'react-redux'

const Home = (props) => {

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <Togglable buttonLabel="create new blog" >
        <BlogForm/>
      </Togglable>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}
export default connect(
  mapStateToProps
)(Home)