import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import teal from 'material-ui/colors/teal'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import TodayIcon from 'material-ui-icons/Today'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'
import API from '../utils/Api'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: teal[500]
  }
})

const options = [
  'Housewarming Party',
  'Baby Shower'
]

class EventsDropdown extends Component {
  state = {
    anchorEl: null,
    open: false,
    selectedIndex: 0,
    allEvents: []
  };

    // mount component
  componentWillMount () {
    this.loadEvent()
  }

    // handle call all guest
  loadEvent = () => {
    API.getEvents()
        .then(res => this.setState({ allEvents: res.data }))
        .catch(err => console.log(err))
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
    console.log(this.state.allEvents)
    const { classes } = this.props
    const { allEvents } = this.state
    return (
      <div className={classes.root}>
        <List>
          <ListItem
            button
            aria-haspopup='true'
            aria-controls='lock-menu'
            aria-label='Event'
            onClick={this.handleClickListItem}
          >
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText
              type='title'
              primary='Event'
              // secondary={allEvents[this.state.selectedIndex].eventName}
            />
          </ListItem>
        </List>
        <Menu
          id='lock-menu'
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {allEvents.map((option, index) => (
            <MenuItem
              key={option.eventName}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option.eventName}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem
            component={Link} to='/events'
            onClick={this.handleRequestClose}
            >
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

export default withStyles(styles)(EventsDropdown)
