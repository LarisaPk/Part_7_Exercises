import React from 'react'
import { connect } from 'react-redux'
import { setVisibility } from '../reducers/togglableReducer'
import { Button } from 'semantic-ui-react'
const Togglable = (props) => {

  const hideWhenVisible = { display: props.visible ? 'none' : '' }
  const showWhenVisible = { display: props.visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button primary onClick={() => props.setVisibility()}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button secondary onClick={() => props.setVisibility()}>cancel</Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    visible: state.toggle
  }
}

const mapDispatchToProps = {
  setVisibility,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Togglable)