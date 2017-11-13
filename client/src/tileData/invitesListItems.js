import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import PresentToAllIcon from 'material-ui-icons/PresentToAll'

export const SendInvitesListItems = props =>
  <ListItem button component={Link} to='/send-invites'>
    <ListItemIcon>
      <PresentToAllIcon />
    </ListItemIcon>
    <ListItemText primary='Send Invites' />
  </ListItem>
