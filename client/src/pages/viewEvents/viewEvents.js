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

const styles = theme => ({
  root: {
    flex: '1 1 100%',
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    },
    margin: '0 auto'
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
      <div className={classes.root}>
        <PageHeader title='Events' body={`Manage your Events!`} />
        <Grid container spacing={24}>
          {this.state.events.map(event => (
            <Grid item xs={12} sm={4}>
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
                    Date: {event.date.slice(0, 10)} <br />
                    Time: {event.time}
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
                  <Button dense component={Link} to='/' >
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

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleCard)
