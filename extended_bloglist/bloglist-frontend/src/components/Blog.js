import React from 'react'
import { Link } from 'react-router-dom'

const Blog = (props) => {
  const blog = props.blog

  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    border: 'solid',
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    boxShadow: '3px 3px grey'
  }
  return(
    <div style={blogStyle}>
      <Link id='blog' style={{ padding: 15 }} to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div>

  )
}

export default Blog