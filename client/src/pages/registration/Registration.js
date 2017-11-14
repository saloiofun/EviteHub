import React, { Component } from 'react'
import API from '../../utils/API'
import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

class Registration extends Component {
  // Setting the initial values
  state = {
    username: "",
    password: "",
    firstName: "",
    lastName: ""
  }

  // handle any changes to the input fields
  handleInputChange = event => {
    const { name, value } = event.target;
    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    })
  }

  // When the form is submitted
  handleFormSubmit = event => {
    event.preventDefault()

    API.registerUser({
      email: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    })
    .then(res => {
      if (res.data){
        console.log(res.data)
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="login">
        <Card>
          <CardContent>
            <form onSubmit={this.handleFormSubmit}>
              <TextField id="firstName" name="firstName" label="First Name" type="text" margin="normal" fullWidth={true} onChange={this.handleInputChange} />
              <TextField id="lastName" name="lastName" label="Last Name" type="text" margin="normal" fullWidth={true} onChange={this.handleInputChange} />         
              <TextField id="username" name="username" label="Email Address" type="text" margin="normal" fullWidth={true} onChange={this.handleInputChange} />
              <TextField id="password" name="password" label="Password" type="password" margin="normal" fullWidth={true} onChange={this.handleInputChange} />
              <br /><br />
              <Button raised color="primary" type="submit">Register</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default Registration