import React, { useEffect } from 'react'
import { useField } from './hooks'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NavigationMenu from './components/Menu'
import BlogInfo from './pages/BlogInfo'
import './App.css'
import Home from './pages/Home'
import Users from './pages/Users'
import User from './pages/User'
import { connect } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser, initializeUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Form, Button } from 'semantic-ui-react'

const App=(props) => {
  const username = useField('text')
  const password = useField('text')
  //load all blogs
  useEffect(() => {
    props.initializeBlogs()
  },[])
  //set user and token if user is logged in
  useEffect(() => {
    props.initializeUser()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.i.value,
        password: password.i.value,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      props.setUser(user)
      username.reset()
      password.reset()

    } catch (exception) {
      props.setMessage('Wrong username or password', 'error', 5)
    }
  }
  const loginform = () => (
    <Form onSubmit={handleLogin}>
      <Form.Field>
        <label>username</label>
        <input { ...username.i } id='username'/>
      </Form.Field>
      <Form.Field>
        <label>password</label>
        <input {...password.i} id='password'/>
      </Form.Field>
      <Button primary type="submit">login</Button>
    </Form>
  )
  if (props.user === null) {
    return (
      <Container>
        <h2>Log in to application</h2>
        <Notification/>
        {loginform()}
      </Container>
    )
  }
  return (
    <Container>
      <Router>
        <div>
          <NavigationMenu/>
          <Route exact path="/" render={() => <Home/>} />
          <Route exact path="/blogs" render={() => <Home/>} />
          <Route exact path="/users" render={() => <Users/>} />
          <Route exact path="/users/:id" render={({ match }) =>
            <User id={match.params.id} />
          } />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <BlogInfo id={match.params.id} />
          } />
        </div>
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user
  }
}
const mapDispatchToProps = {
  setMessage,
  initializeBlogs,
  setUser,
  initializeUser
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
