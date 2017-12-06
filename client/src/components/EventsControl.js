import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import teal from 'material-ui/colors/teal'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import TodayIcon from 'material-ui-icons/Today'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: teal[500]
  }
})

const EventsDropdown = (handleClickListItem, handleRequestClose, eventName, anchorEl, menuOpen, allEvents, classes) => (
  <div className={classes.root}>
    <List>
      <ListItem
        button
        aria-haspopup='true'
        aria-controls='lock-menu'
        aria-label='Event'
        onClick={handleClickListItem} >
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText
          type='title'
          primary='Event'
          secondary={eventName} />
      </ListItem>
    </List>
    <Menu
      id='lock-menu'
      anchorEl={anchorEl}
      open={menuOpen}
      onRequestClose={handleRequestClose} >
      {allEvents.map((option, index) => (
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
        onClick={handleRequestClose} >
          View All
        </MenuItem>
    </Menu>
  </div>
  )

EventsDropdown.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventsDropdown)
