import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

const DrawerLink = props =>
  <ListItem button component={Link} to={props.to}>
    <ListItemIcon>
      {props.children}
    </ListItemIcon>
    <ListItemText primary={props.label} />
  </ListItem>

export default DrawerLink
