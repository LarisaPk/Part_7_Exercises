import React from 'react'
import DeleteButton from '../components/DeleteButton'
import { initializeBlogs } from '../reducers/blogsReducer'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import  { useField } from '../hooks'
import commentService from '../services/comments'
import { setMessage } from '../reducers/notificationReducer'
import Notification from '../components/Notification'
import { Form, Button, Icon, Label, Comment } from 'semantic-ui-react'

const BlogInfo = (props) => {
  const newComment = useField('text')
  const blog = props.blog

  const addComment = async (event) => {
    try {
      event.preventDefault()
      const commentObject = {
        comment: newComment.i.value
      }
      const returnedComment = await commentService.addComment(blog.id, commentObject)
      props.initializeBlogs()
      props.setMessage(`a new comment ${returnedComment.comment} added`, 'ui success message', 5)
      newComment.reset()
    }catch (error) {
      props.setMessage('comment is requred', 'ui error message', 5)
    }
  }

  const addLike = async () => {
    const newLikes =blog.likes+1

    const blogObject = {
      user: blog.user,
      author: blog.author,
      title: blog.title,
      url:blog.url,
      likes: newLikes
    }
    const updatedBlog = await blogService.update(blog.id, blogObject)
    console.log(updatedBlog)
    console.log(newLikes)
    props.initializeBlogs()
  }
  if ( blog === undefined) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <Notification/>
      <a href={blog.url}>{blog.url}</a><br />

      <Button id='like' as='div' labelPosition='right' onClick={addLike}>
        <Button color='green'>
          <Icon name='heart' />
        Like
        </Button>
        <Label id='likesNumber' as='a' basic color='green' pointing='left'>
          {blog.likes}
        </Label>
      </Button><br />

      added by {blog.name}<br />
      <DeleteButton blog={blog}/>
      <h3>Comments</h3>

      <Comment.Group>
        {blog.comments.map(comment =>
          <Comment key={comment.id}>
            <Comment.Content>
              <Comment.Text>{comment.comment}</Comment.Text>
            </Comment.Content>
          </Comment>
        )}
        <Form onSubmit={addComment}>
          <Form.Field>
            <input id='comment'{ ...newComment.i }/>
          </Form.Field>
          <Button id='addComment' content='Add Comment' labelPosition='left' icon='edit' primary type="submit"></Button>
        </Form>
      </Comment.Group>
    </div>
  )
}

const mapDispatchToProps = {
  initializeBlogs,
  setMessage
}
const mapStateToProps = (state, props) => {
  return {
    blog: state.blogs.find(blog => blog.id === props.id),
    user: state.user
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogInfo)