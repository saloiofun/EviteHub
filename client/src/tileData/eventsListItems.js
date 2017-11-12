import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import InboxIcon from 'material-ui-icons/Inbox'

export const EventsListItems = props =>
  <ListItem button component={Link} to='/events'>
    <ListItemIcon>
      <InboxIcon />
    </ListItemIcon>
    <ListItemText primary='Events' />
  </ListItem>
