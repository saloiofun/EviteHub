import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ContactsIcon from 'material-ui-icons/Contacts'

export const GuestListItems = props =>
  <ListItem button component={Link} to='/guest-list'>
    <ListItemIcon>
      <ContactsIcon />
    </ListItemIcon>
    <ListItemText primary='Guest List' />
  </ListItem>
