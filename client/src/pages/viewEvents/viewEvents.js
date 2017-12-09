import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import API from '../../utils/Api'
import Button from 'material-ui/Button'
import PageHeader from '../../components/PageHeader'
import Divider from 'material-ui/Divider'
import moment from 'moment'
import * as actionTypes from '../../store/actions/'

import compose from 'recompose/compose'
import { connect } from 'react-redux'

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
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  },
  info: {
    marginTop: 10
  },
  media: {
    height: 150
  }
})

class viewEvents extends React.Component {
  state = {
    events: []
  }

  deleteEvent = (id) => {
    API.deleteEvent(id)
    .then(data => {
      console.log(data)
      API.getEventByUserId(this.props.auth.profile.sub)
      .then(res => {
        this.props.onUpdateAllEvents(res.data)
      })
    })
    .catch(err => console.log(err))
  }

  onView = (id, index) => {
    API.getEventById(id)
    .then(res => {
      console.log(res.data)
      this.props.onUpdateCurrentEvent(res.data, index)
    })
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <PageHeader title='Events' body={`Manage your Events!`} />
        <Grid container spacing={24}>
          {this.props.events.map((event, index) => (
            <Grid item xs={12} sm={4} key={event._id}>
              <Card>
                <CardMedia
                  className={classes.media}
                  image='/static/images/events/event-dashboard.jpg'
                  title='Event'
              />
                <CardContent>
                  <Typography type='headline' component='h2'>
                    {event.eventName}
                  </Typography>
                  <Typography className={classes.info} component='p'>
                    Location: {event.location} <br />
                    Date: {moment(event.date).format('MMMM Do YYYY')} <br />
                    Time: {moment(event.time).format('hh:mm A')}
                  </Typography>
                  <Typography component='p'>
                    Description: {event.description}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button dense onClick={() => this.onView(event._id, index)} component={Link} to='/' >
                    View
                  </Button>
                  <Button dense onClick={() => this.deleteEvent(event._id)} >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
      ))}
        </Grid>
      </div>
    )
  }
}

viewEvents.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    events: state.event.events
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateAllEvents: (events) => dispatch(actionTypes.updateAllEvents(events)),
    onUpdateCurrentEvent: (currentEvent, selectedIndex) => dispatch(actionTypes.updateCurrentEvent(currentEvent, selectedIndex))
  }
}

export default compose(
  withStyles(styles, {
    name: 'viewEvents'
  }), connect(mapStateToProps, mapDispatchToProps)
)(viewEvents)
