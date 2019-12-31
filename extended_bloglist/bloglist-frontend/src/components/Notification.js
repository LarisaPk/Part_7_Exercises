import React from 'react'
import { connect } from 'react-redux'
import { Container, Message } from 'semantic-ui-react'

const Notification = (props) => {

  if (props.notification.message === null) {
    return null
  }
  return (
    <Container>
      {(props.notification.message &&
      <Message className={props.notification.messageStyle}>
        {props.notification.message}
      </Message>
      )}
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}
export default connect(
  mapStateToProps
)(Notification)