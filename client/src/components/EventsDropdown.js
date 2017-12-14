import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import teal from 'material-ui/colors/teal'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import TodayIcon from 'material-ui-icons/Today'
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'
import * as actionTypes from '../store/actions/'
import API from '../utils/Api'
import orange from 'material-ui/colors/orange'

import compose from 'recompose/compose'
import { connect } from 'react-redux'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: teal[500]
  },
  iconOrange: {
    fill: orange[500]
  }
})

class EventsDropdown extends Component {
  state = {
    anchorEl: null,
    open: false
  }

  componentWillMount () {
    this.props.onFetchEvents(this.props.userId)
  }

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleMenuItemClick = (event, index, eventId) => {
    this.setState({ open: false })
    API.getEventById(eventId)
    .then(res => {
      this.props.onUpdateCurrentEvent(res.data, index)
    })
    .catch(err => console.log(err))
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render () {
    const { classes, events, currentEvent, selectedIndex } = this.props

    return (
      <div className={classes.root}>
        <List>
          <ListItem
            button
            aria-haspopup='true'
            aria-controls='lock-menu'
            aria-label='Event'
            onClick={this.handleClickListItem} >
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText
              type='title'
              primary='Event'
              secondary={currentEvent.eventName} />
            <KeyboardArrowDownIcon className={classes.iconOrange} />
          </ListItem>
        </List>
        <Menu
          id='lock-menu'
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose} >
          {events.map((option, index) => (
            <MenuItem
              key={option.eventName}
              selected={index === selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index, option._id)}
              component={Link} to='/'>
              {option.eventName}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem
            component={Link} to='/events'
            onClick={this.handleRequestClose} >
            View All
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

EventsDropdown.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    events: state.event.events,
    currentEvent: state.event.currentEvent,
    userId: state.auth.profile.sub,
    selectedIndex: state.event.selectedIndex
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchEvents: (userId) => dispatch(actionTypes.fetchEvents(userId)),
    onUpdateCurrentEvent: (currentEventId, selectedIndex) => dispatch(actionTypes.updateCurrentEvent(currentEventId, selectedIndex))
  }
}

export default compose(
  withStyles(styles, {
    name: 'EventsDropdown'
  }), connect(mapStateToProps, mapDispatchToProps)
)(EventsDropdown)
