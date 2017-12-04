import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import orange from 'material-ui/colors/orange'
import classNames from 'classnames'
import Grid from 'material-ui/Grid'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { Face, Print, ViewList, Assignment } from 'material-ui-icons'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    paddingTop: 80,
    margin: '0 auto',
    marginBottom: 30,
    minHeight: '100vh',
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    }
  },
  cards: {
    flexGrow: 1,
    marginTop: 30
  },
  button: {
    margin: theme.spacing.unit
  },
  raisedAccent: {
    backgroundColor: orange[700]
  },
  cardItem: {
    textAlign: 'center'
  },
  iconColor: {
    color: orange[700]
  }
})

class Home extends Component {
  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div className='featured-image'>
          <div className='featured-content'>
            <div className='featured-content-gradient'>
              <h1 className='featured-title'>Take the Hassle out of Event Planning</h1>
              <p>Plan your next Event with us by using our easy to use Event Planner. Event Planning has never been easier.</p>
              <div>
                <Button raised color='primary' className={classes.button}>Sign Up</Button>
                <Button raised color='accent' className={classNames(classes.button, classes.raisedAccent)}>Sign In</Button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.cards}>
          <Grid container spacing={24}>
            <Grid item xs={6} lg={3}>
              <Card className={classNames(classes.card, classes.cardItem)}>
                <CardContent>
                  <Face className={classes.iconColor} style={{ width: 64, height: 64 }} />
                  <Typography type='headline' component='h2'>Invitations</Typography>
                  <Typography component='p'>
                    Create your guest list and send out invitations for your event. Send out reminders and more...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} lg={3}>
              <Card className={classNames(classes.card, classes.cardItem)}>
                <CardContent>
                  <Print className={classes.iconColor} style={{ width: 64, height: 64 }} />
                  <Typography type='headline' component='h2'>Guest List</Typography>
                  <Typography component='p'>
                    Use our guest list to keep track of who's RSVP'd, Invite guest. Send out invitations and more...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} lg={3}>
              <Card className={classNames(classes.card, classes.cardItem)}>
                <CardContent>
                  <ViewList className={classes.iconColor} style={{ width: 64, height: 64 }} />
                  <Typography type='headline' component='h2'>Checklist</Typography>
                  <Typography component='p'>
                    Stay on schedule and keep track of your checklist of items needed for your event
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} lg={3}>
              <Card className={classNames(classes.card, classes.cardItem)}>
                <CardContent>
                  <Assignment className={classes.iconColor} style={{ width: 64, height: 64 }} />
                  <Typography type='headline' component='h2'>Events</Typography>
                  <Typography component='p'>
                    You can create multiple events and keep track of each event with guestlist, invitations and more...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
