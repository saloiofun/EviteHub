import React, { Component } from 'react'
import PropTypes from 'prop-types'
import teal from 'material-ui/colors/teal'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import TodoList from '../../components/TodoList'
import PageHeader from '../../components/PageHeader'
import ProgressCard from '../../components/progressCard'
import TodayIcon from 'material-ui-icons/Today'
import GroupIcon from 'material-ui-icons/Group'
import ListIcon from 'material-ui-icons/List'
import moment from 'moment'
import * as actionTypes from '../../store/actions'

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
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  card: {
    minWidth: 275
  },
  media: {
    height: 250
  },
  progress: {
    height: 150
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
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
  progressIcon: {
    width: 100,
    height: 'auto',
    fill: teal[300]
  }
})

class Dashboard extends Component {
  state = {
    daysLeft: ''
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.currentEvent) {
      if (nextProps.currentEvent._id !== this.props.currentEvent._id) {
        this.props.onFetchGuest(nextProps.currentEvent._id)
        this.props.onFetchTodo(nextProps.currentEvent._id)

        let daysLeft = moment(nextProps.currentEvent.date).startOf('day').diff(moment().startOf('day'), 'days')
        this.setState({daysLeft: daysLeft})
      }
    }
  }

  findDaysLeft = () => {
    let daysLeft = moment(this.props.currentEvent.date).startOf('day').diff(moment().startOf('day'), 'days')
    this.setState({daysLeft: daysLeft})
  }

  render () {
    const { classes, auth, currentEvent, dashboard } = this.props

    return (
      <div className={classes.root}>
        <PageHeader title={currentEvent.eventName ? currentEvent.eventName : 'Dashboard'} body={`Welcome Back! ${auth.profile.name}`} />
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4}>
            <ProgressCard title='Days Left' info={this.state.daysLeft}>
              <TodayIcon className={classes.progressIcon} />
            </ProgressCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ProgressCard title='RSVP' info={`${dashboard.rsvpGuest} / ${dashboard.allGuest}`}>
              <GroupIcon className={classes.progressIcon} />
            </ProgressCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ProgressCard title='To Do' info={`${dashboard.toDoCompleted} / ${dashboard.toDoCount}`}>
              <ListIcon className={classes.progressIcon} />
            </ProgressCard>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image='/static/images/cards/contemplative-reptile.jpg'
                title='Website'
              />
              <CardContent>
                <Typography type='headline' component='h2'>
                  Title
                </Typography>
              </CardContent>
              <CardActions>
                <Button dense color='primary'>
                  Share
                </Button>
                <Button dense color='primary'>
                  View Website
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className={classes.card}>
              <CardContent>
                <TodoList />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    currentEvent: state.event.currentEvent,
    dashboard: state.dashboard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchGuest: (eventId) => dispatch(actionTypes.fetchGuestDashboard(eventId)),
    onFetchTodo: (eventId) => dispatch(actionTypes.fetchTodoDashboard(eventId))
  }
}

export default compose(
  withStyles(styles, {
    name: 'Dashboard'
  }), connect(mapStateToProps, mapDispatchToProps)
)(Dashboard)
