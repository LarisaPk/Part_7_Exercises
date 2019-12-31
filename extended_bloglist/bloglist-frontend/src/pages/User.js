import React from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'

const User = (props) => {

  if ( props.user === undefined) {
    return null
  }

  return (
    <div>
      <h2>{props.user.name}</h2>
      <h3>added blogs</h3>
      <List divided relaxed>
        {props.user.blogs.map(blog =>
          <List.Item key={blog.id}>
            <List.Content>
              <List.Header>{blog.title}</List.Header>
            </List.Content>
          </List.Item>
        )}
      </List>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  console.log('user for view', props.id)
  return {
    user: state.users.find(user => user.id === props.id)
  }
}

export default connect(
  mapStateToProps
)(User)