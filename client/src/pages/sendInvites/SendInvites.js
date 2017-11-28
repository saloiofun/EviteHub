import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar';
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
    error: false,
    emailsSent: false,
    emailURL: 'https://www.google.com/'
  }

  validateEmail = (email) => {
    var reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (reg.test(email)) {
      return true
    } else {
      return false
    }
  }

  handleRequestClose = () => {
    this.setState({ error: false , emailsSent: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  onSend = () => {
    this.setState({emailsSent: false})
    var emailArray = this.state.to.split(',')

    for (let i in emailArray) {
      if (!this.validateEmail(emailArray[i])) {
        this.setState({error: true})
        return
      }
    }
    this.setState({error: false})

    for (let i in emailArray) {
      let email = {
        to: emailArray[i],
        subject: this.state.subject,
        message: this.state.message,
        url: this.state.emailURL
      }
      API.sendEmail(email)
      .then((data) => {
        this.setState({emailsSent: true})
        API.saveGuest({ guestEmail: data.data.accepted[0] , emailed: true })
        .then((guest) => {
        })
        .catch((error) => {
          if (error) throw error
        })
      })
      .catch((err) => {
        if (err) throw err
      })
    }
  }

  render () {
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <Grid container>
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
            <Button raised color='primary' onClick={this.onSend} >
              Send
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={this.state.error}
          onRequestClose={this.handleRequestClose}
          autoHideDuration= { 3000 }
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Error: Make sure all you entered all emails correctly</span>}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={this.state.emailsSent}
          onRequestClose={this.handleRequestClose}
          autoHideDuration= '3000'
          SnackbarContentProps={{
            'aria-describedby': 'message-id2',
          }}
          message={<span id="message-id">Invite(s) were sent!</span>}
        />
      </Paper>
    )
  }
}

SendInvites.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SendInvites)
