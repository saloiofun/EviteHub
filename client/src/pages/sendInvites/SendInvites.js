import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Alert from '../../components/Alert'
import API from '../../utils/Api'
import PageHeader from '../../components/PageHeader'
import SendIcon from 'material-ui-icons/Send'
import RemoveRedEyeIcon from 'material-ui-icons/RemoveRedEye'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    paddingTop: 80,
    margin: '0 auto',
    marginBottom: 30,
    minHeight: '100vh',
    [theme.breakpoints.up('md')]: {
      width: '80%',
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    }
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  alerts: {
    top: 80
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: 'auto',
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
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
    emailURL: 'http://localhost:3000/rsvp/?id='
  }

  validateEmail = (email) => {
    let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (reg.test(email)) {
      return true
    } else {
      return false
    }
  }

  handleRequestClose = () => {
    this.setState({ error: false, emailsSent: false })
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  onSend = () => {
    this.setState({emailsSent: false})
    let emailArray = this.state.to.split(';')

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
        console.log('Data:', data)
      })
      .catch((err) => {
        if (err) throw err
      })
    }
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <PageHeader title='Send Invites' body={`Send Invites!`} />
        <Paper elevation={4}>
          <form className={classes.container} noValidate autoComplete='off'>
            <TextField
              label='To'
              placeholder='Separate emails by semicolons'
              value={this.state.to}
              className={classes.textField}
              fullWidth
              margin='normal'
              onChange={this.handleChange('to')}
            />
            <TextField
              id='subject'
              label='Subject'
              value={this.state.subject}
              className={classes.textField}
              margin='normal'
              fullWidth
              onChange={this.handleChange('subject')}
            />
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
            <div className={classes.button}>
              <Button className={classes.button} raised color='primary' >
              Preview
              <RemoveRedEyeIcon className={classes.rightIcon} />
              </Button>
              <Button raised color='primary' onClick={this.onSend} >
              Send
              <SendIcon className={classes.rightIcon} />
              </Button>
            </div>
          </form>
          <Alert
            open={this.state.error}
            onRequestClose={this.handleRequestClose}
            message='Error: Make sure all you entered all emails correctly'
        />
          <Alert
            open={this.state.emailsSent}
            onRequestClose={this.handleRequestClose}
            message='Invite(s) were sent!'
        />
        </Paper>
      </div>
    )
  }
}

SendInvites.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SendInvites)
