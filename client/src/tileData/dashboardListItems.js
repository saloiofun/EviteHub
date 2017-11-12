import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import InboxIcon from 'material-ui-icons/Inbox'

export const DashboardListItems = props =>
  <ListItem button component={Link} to='/'>
    <ListItemIcon>
      <InboxIcon />
    </ListItemIcon>
    <ListItemText primary='Dashboard' />
  </ListItem>
