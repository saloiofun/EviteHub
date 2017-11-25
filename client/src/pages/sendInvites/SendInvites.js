import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import API from '../../utils/Api'

const styles = theme => ({
  root: {
    flex: '1 1 100%',
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    },
    margin: '0 auto'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  grids: {
    padding: '15px'
  }
})

class SendInvites extends React.Component {
  state = {
    to: '',
    subject: 'Event Name',
    message: `Hi, you are invited to my event! 
Please click on the link to let me know if you can make it!`,
    error: false
  }

  validateEmail = (email) => {
   var reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
   if (reg.test(email)){
     return true;
   }
   else{
     return false;
   }
  } 

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  onSend = () => {
    var email = {
      to: this.state.to,
      subject: this.state.subject,
      message: this.state.message,
      user: 'Test User',
      url: 'google.com'
    }

    var emailArray = email.to.split(',')

    for (var i in emailArray){
      console.log("Email: ", emailArray[i])
      console.log("Email valid: ", this.validateEmail(emailArray[i]))
      if (!this.validateEmail(emailArray[i])){
        this.setState({error: true})
        return
      }
    }

    console.log(email)
    API.sendEmail(email)
    .then(function(data){
      console.log(data)
    })
    .catch(function(err){
      if (err) throw err
    });
  }

  render () {
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <Grid container>
          {this.state.error ? <Grid item xs={12} >
              <Typography align='center' color='error' >Error: Make sure all you entered all emails correctly</Typography>
            </Grid> : <Grid/>}
            
          <Grid item xs={11} className={classes.grids}>
            <TextField
              label='To'
              placeholder='Separate emails by commas'
              value={this.state.to}
              className={classes.textField}
              fullWidth
              margin='normal'
              onChange={this.handleChange('to')}
          />
          </Grid>
          <Grid item xs={11} className={classes.grids}>
            <TextField
              id='subject'
              label='Subject'
              value={this.state.subject}
              className={classes.textField}
              margin='normal'
              fullWidth
              onChange={this.handleChange('subject')}
          />
          </Grid>
          <Grid item xs={11} className={classes.grids}>
            <TextField
              id='message'
              label='Message'
              multiline
              rows='10'
              fullWidth
              value={this.state.message}
              className={classes.textField}
              margin='normal'
              onChange={this.handleChange('message')}
            />
          </Grid>
          <Grid item xs={2} align='center'>
            <Button raised color='primary' onClick = {this.onSend} >
              Send
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

SendInvites.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SendInvites)
