import React, { Component } from 'react'
import API from '../../utils/Api'
import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

class Login extends Component {
  // Setting the initial values
  state = {
    username: '',
    password: '',
    loggedin: false,
    user: {}
  }

  // handle any changes to the input fields
  handleInputChange = event => {
    const { name, value } = event.target
    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    })
  }

  // When the form is submitted
  handleFormSubmit = event => {
    event.preventDefault()

    API.login({
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      console.log(res)
      if (res.data !== 'login failed') {
        this.setState({ loggedin: true, user: res.data })
      }
    })
    .catch(err => console.log(err))
  }

  render () {
    return (
      <div className='login'>
        <Card>
          <CardContent>
            <form onSubmit={this.handleFormSubmit}>
              <TextField id='username' name='username' label='Email Address' type='text' margin='normal' fullWidth onChange={this.handleInputChange} />
              <TextField id='password' name='password' label='Password' type='password' margin='normal' fullWidth onChange={this.handleInputChange} />
              <br /><br />
              <Button raised color='primary' type='submit'>Log In</Button>
            </form>
          </CardContent>
        </Card>
        { this.state.loggedin ? 'True' : 'False' }<br />
        { this.state.user._id }<br />
        { this.state.user.email }<br />
        { this.state.user.password }<br />
        { this.state.user.firstName }<br />
        { this.state.user.lastName }<br />
      </div>
    )
  }
}

export default Login
