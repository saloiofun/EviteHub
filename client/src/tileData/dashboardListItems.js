import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import DashboardIcon from 'material-ui-icons/Dashboard'

export const DashboardListItems = props =>
  <ListItem button component={Link} to='/'>
    <ListItemIcon>
      <DashboardIcon />
    </ListItemIcon>
    <ListItemText primary='Dashboard' />
  </ListItem>
