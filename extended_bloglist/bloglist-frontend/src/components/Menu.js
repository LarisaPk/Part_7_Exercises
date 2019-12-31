import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { setMessage } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { Menu, Button, Icon } from 'semantic-ui-react'
import { useState } from 'react'

const NavigationMenu = (props) => {
  const padding = { padding: 20, color: 'black' }

  const [activeItem, setActiveItemValue] = useState('')

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    props.setMessage(`user ${props.user.name} logged out`, 'ui success message', 5)
    props.setUser(null)
    props.history.push('/')
  }
  return (
    <div>
      <Menu style={{ padding:0 }}>

        <Menu.Item link icon
          style={{ padding:0 }}
          name='blogs'
          active={activeItem === 'blogs'}>
          <Link style={padding} to="/blogs" onClick={ () => setActiveItemValue('blogs')}><Icon name='book' />blogs</Link>
        </Menu.Item >

        <Menu.Item link icon
          style={{ padding:0 }}
          name='users'
          active={activeItem === 'users'}>
          <Link style={padding} to="/users" onClick={ () => setActiveItemValue('users')}><Icon name='users' />users</Link>
        </Menu.Item>

        <Menu.Item icon style={{ padding:0 }}>
          <span style={padding}><Icon name='user circle' />{props.user.name} logged in </span><Button secondary type="button" onClick={handleLogout}><Icon name='log out' />logout</Button>
        </Menu.Item>

      </Menu>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = {
  setMessage,
  setUser
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavigationMenu))