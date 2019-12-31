import React from 'react'
import blogService from '../services/blogs'
import  { useField } from '../hooks'
import { connect } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogsReducer'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = (props) => {

  const newtitle = useField('text')
  const newauthor = useField('text')
  const newurl = useField('text')

  const addBlog = async (event) => {
    try {
      event.preventDefault()
      const blogObject = {
        title: newtitle.i.value,
        author: newauthor.i.value,
        url: newurl.i.value,
      }
      const returnedBlog = await blogService.create(blogObject)
      props.initializeBlogs()
      props.setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'ui success message', 5)
      newtitle.reset()
      newauthor.reset()
      newurl.reset()

    }catch (error) {
      props.setMessage('title and author are requred fields', 'ui error message', 5)
    }
  }
  return (
  <>
  <h2>create new</h2>
    <Form onSubmit={addBlog}>
      <Form.Field>
        <label>title:</label>
        <input id='title' { ...newtitle.i }/>
      </Form.Field>
      <Form.Field>
        <label>author:</label>
        <input id='author' { ...newauthor.i }/>
      </Form.Field>
      <Form.Field>
        <label>url:</label>
        <input id='url' { ...newurl.i }/>
      </Form.Field>
      <Button id='create' primary type="submit">create</Button>
    </Form>
  </>
  )
}

const mapDispatchToProps = {
  setMessage,
  initializeBlogs,
}
export default connect(
  null,
  mapDispatchToProps
)(BlogForm)