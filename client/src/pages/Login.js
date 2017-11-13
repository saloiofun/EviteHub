import React, { Component } from "react";
import API from "../utils/API";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends Component {
  // Setting the initial values
  state = {
    username: "",
    password: "",
    loggedin: false,
    user: {}
  };

  // handle any changes to the input fields
  handleInputChange = event => {
    const { name, value } = event.target;
    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted
  handleFormSubmit = event => {
    event.preventDefault();

    API.login({
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      if ( res.status === 200 ){
        this.setState({ loggedin: true, user: res.data })
      }
    })
    .catch(err => console.log(err))
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className="login">
          <form onSubmit={this.handleFormSubmit}>
          <CardTitle title="Login"/>
            <Card>
              <CardText>
                <TextField id="username" name="username" floatingLabelText="Email Address"  type="text" fullWidth={true} onChange={this.handleInputChange} />
                <TextField id="password" name="password" floatingLabelText="Password" type="password"  fullWidth={true} onChange={this.handleInputChange} />
                <RaisedButton type="submit" fullWidth={true} primary={true} label="Log In" />
              </CardText>
            </Card>
          </form><br />
          { this.state.loggedin ? 'True' : 'False' }<br />
          { this.state.user._id }<br />
          { this.state.user.email }<br />
          { this.state.user.password }<br />
          { this.state.user.firstName }<br />
          { this.state.user.lastName }<br />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Login;