import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeAllUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Users = (props) => {
  //load all users
  useEffect(() => {
    props.initializeAllUsers()
  },[])
  console.log('users array',props.users)
  return (
    <div >
      <h2>Users</h2>
      <Table striped celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <strong>User Name</strong>
            </Table.Cell>
            <Table.Cell>
              <strong>Blogs created</strong>
            </Table.Cell>
          </Table.Row>

          {props.users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}
const mapDispatchToProps = {
  initializeAllUsers
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)