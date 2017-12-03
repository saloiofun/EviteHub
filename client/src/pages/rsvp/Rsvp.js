import React from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import API from '../../utils/Api'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import moment from 'moment'
import Radio from 'material-ui/Radio'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 9,
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    // maxHeight: 400,
    paddingTop: 16,
    paddingBottom: 16,
    width: '50%',
    margin: '0 auto',
    height: '80%'
  },
  media: {
    height: 150
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: 'auto',
    marginRight: theme.spacing.unit
  }
})

class Rsvp extends React.Component {
  state = {
    event: {
      eventName: 'Title of Event',
      description: 'This is the description of the event which was given by the creator of the event',
      location: 'Irvine, CA',
      Date: 'March 8, 2018',
      Time: '3:15 PM',
      rsvp: '',
      name: '',
      party: 0
    }
  }
  componentDidMount () {
    var parsedURL = new URL(window.location.href)
    var hash = parsedURL.searchParams.get('token')
    this.getGuest(hash)
  }

  getGuest = (hash) => {
    API.getGuestByHash(hash)
    .then((data) => {
      console.log('Guest:', data)
      this.setState({ guestObject: data })
    })
    .catch((err) => {
      throw (err)
    })
  }

  getEventInfo = (id) => {
    API.getEvent(id)
    .then((data) => {
      console.log('Event:', data)
    })
  }

  onSubmit = () => {
    switch (this.state.rsvp) {
      case 'Accept':
        API.updateGuest(this.state.guestObject._id,
          {
            guestName: this.state.name,
            guestParty: this.state.party,
            rsvp: true
          })
        .then(data => {
          console.log(data)
        })
        break
      case 'Reject':
        API.updateGuest(this.state.guestObject._id,
          {
            guestName: this.state.guestName,
            guestParty: this.state.guestParty,
            rsvp: false
          })
        .then(data => {
          console.log(data)
        })
        break
      default:
        console.log('Error did not select radio button')
    }
  }

  handleRSVP = (event, rsvp) => {
    console.log(rsvp)
    this.setState({ rsvp })
  }

    // handle input changes
  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render () {
    const { classes } = this.props

    return (
      <Paper className={classes.root} elevation={8}>
        <Grid container spacing={12}>
          <Grid item xs={12}>
            <Grid container justify='center'>
              <Grid item xs={12} sm={10}>
                <Card>
                  {/* <CardMedia
                className={classes.media}
                image='/static/images/events/event.jpg'
                title='Event'
              /> */}
                  <CardContent>
                    <Typography type='headline' component='h2'>
                      {this.state.event.eventName}
                    </Typography>
                    <Typography className={classes.info} component='p'>
                    Location: {this.state.event.location} <br />
                    Date: {moment(this.state.event.date).format('MMMM Do YYYY')} <br />
                    Time: {moment(this.state.event.time).format('hh:mm A')}
                    </Typography>
                    <Typography component='p'>
                    Description: {this.state.event.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin='dense'
              name='name'
              label='Guest Name'
              value={this.state.name}
              onChange={this.handleInputChange}
          />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin='dense'
              type='number'
              name='party'
              inputProps={{min: 0}}
              label='No. of Party'
              value={this.state.party}
              onChange={this.handleInputChange}
          />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography type='h1'> Will You Be Attending? </Typography>
            <span className={{verticalAlign: 'middle'}}>
              <Radio
                checked={this.state.selectedValue === 'Accept'}
                onChange={this.handleChange}
                value='Accept'
                name='Accept'
                aria-label='Accept'
              />
               Accept
            </span>
            <span verticalAlign='middle'>
              <Radio
                checked={this.state.selectedValue === 'Reject'}
                onChange={this.handleChange}
                value='Reject'
                name='Reject'
                aria-label='Reject'
              />
              Reject
              </span>
          </Grid>
        </Grid>
        <Button className={classes.button} onClick={this.onSubmit} color='primary'>
              Submit
        </Button>
      </Paper>
    )
  }
}

Rsvp.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Rsvp)
