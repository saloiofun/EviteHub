import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import API from '../../utils/Api'

const styles = theme => ({
  root: {
    flex: '1 1 100%',
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    },
    margin: '0 auto'
  },
  card: {
    width: '100%',
    marginTop: 20
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

class SimpleCard extends React.Component {
  state = {
    events: []
  }

  componentDidMount () {
    API.getEvents()
    .then(res => {
      this.setState({ events: res.data })
    })
    .catch(err => this.setState({ error: err.message }))
  }

  render () {
    const { classes } = this.props
    return (
      <div >
        <Grid container>
          {this.state.events.map(event => (
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image='/static/images/events/event.jpg'
                  title='Event'
              />
                <CardContent>
                  <Typography type='body1' className={classes.title}>
                    Event
                  </Typography>
                  <Typography type='headline' component='h2'>
                    {event.eventName}
                  </Typography>
                  <Typography className={classes.info} component='p'>
                    Location: {event.location} <br />
                    Date: {event.date.slice(0, 10)} <br />
                    Time: {event.time}
                  </Typography>
                  <Typography component='p'>
                    Description: {event.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to='/' dense>View</Link>
                </CardActions>
              </Card>
            </Grid>
      ))}
        </Grid>
      </div>
    )
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleCard)
