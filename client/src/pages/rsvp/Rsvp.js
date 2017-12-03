import React from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import API from '../../utils/Api'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import moment from 'moment'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 9,
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    paddingTop: 16,
    paddingBottom: 16,
    width: '50%',
    margin: '0 auto',
    height: '80%'
  }
})

class Rsvp extends React.Component {
  state = {
    event: {
      eventName: 'Title of Event',
      description: 'This is the description of the event which was given by the creater of the event',
      location: 'Irvine, CA',
      Date: 'March 8, 2018',
      Time: '3:15 PM'
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

  render () {
    const { classes } = this.props

    return (
      <Paper className={classes.root} elevation={8}>
        <Card>
          <CardMedia
            className={classes.media}
            image='/static/images/events/event.jpg'
            title='Event'
              />
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
      </Paper>
    )
  }
}

Rsvp.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Rsvp)
