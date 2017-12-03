import React, { Component } from 'react'
import { Redirect, Router } from 'react-router-dom'
import history from '../../history'

class Logout extends Component {
  componentWillMount () {
    this.props.hideSideBar()
    this.props.auth.logout()
  }

  render () {
    return (
      <Router history={history}>
        <Redirect to='/' />
      </Router>
    )
  }
}

export default Logout
