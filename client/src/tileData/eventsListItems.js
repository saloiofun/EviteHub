import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import TodayIcon from 'material-ui-icons/Today'

export const EventsListItems = props =>
  <ListItem button component={Link} to='/events'>
    <ListItemIcon>
      <TodayIcon />
    </ListItemIcon>
    <ListItemText primary='Events' />
  </ListItem>
