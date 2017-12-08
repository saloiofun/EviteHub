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

  componentDidMount () {
    this.loadEvents()
  }

  loadEvents = () => {
    API.getEvents()
    .then(res => {
      this.setState({ events: res.data })
    })
    .catch(err => this.setState({ error: err.message }))
  }

  deleteEvent = (id) => {
    API.deleteEvent(id)
    .then(data => {
      this.loadEvents()
      console.log(data)
    })
    .catch(err => console.log(err))
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <PageHeader title='Events' body={`Manage your Events!`} />
        <Grid container spacing={24}>
          {this.state.events.map(event => (
            <Grid item xs={12} sm={4} key={event._id}>
              <Card>
                <CardMedia
                  className={classes.media}
                  image='/static/images/events/event.jpg'
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
                  <Button dense component={Link} to='/' >
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
export default withStyles(styles)(viewEvents)
