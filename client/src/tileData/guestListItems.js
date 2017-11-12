import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import InboxIcon from 'material-ui-icons/Inbox'

export const GuestListItems = props =>
  <ListItem button component={Link} to='/guest-list'>
    <ListItemIcon>
      <InboxIcon />
    </ListItemIcon>
    <ListItemText primary='Guest List' />
  </ListItem>
