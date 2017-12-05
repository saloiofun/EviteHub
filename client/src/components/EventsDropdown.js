import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import teal from 'material-ui/colors/teal'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import TodayIcon from 'material-ui-icons/Today'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'
import * as actionTypes from '../store/actions/'

import compose from 'recompose/compose'
import { connect } from 'react-redux'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: teal[500]
  }
})

class EventsDropdown extends Component {
  state = {
    anchorEl: null,
    open: false,
    selectedIndex: 0
  }

  componentDidMount () {
    this.props.onFetchEvents()
  }

  button = undefined;

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, open: false })
  };

  handleRequestClose = () => {
    this.setState({ open: false })
  };

  render () {
    const { classes, events } = this.props

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
              secondary={events[0] ? events[this.state.selectedIndex].eventName : ''} />
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
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)} >
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
    events: state.event.events
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchEvents: () => dispatch(actionTypes.fetchEvents())
  }
}

export default compose(
  withStyles(styles, {
    name: 'EventsDropdown'
  }), connect(mapStateToProps, mapDispatchToProps)
)(EventsDropdown)
