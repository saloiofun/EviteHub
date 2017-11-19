import React, { Component } from 'react'
import API from '../../utils/Api'
import Switch from 'material-ui/Switch'
import IconButton from 'material-ui/IconButton'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Edit from 'material-ui-icons/Edit'
import Delete from 'material-ui-icons/Delete'
import Chip from 'material-ui/Chip'
import AddIcon from 'material-ui-icons/Add'
import FaceIcon from 'material-ui-icons/Face'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'

// const for style
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250
  },
  TableCell: { textAlign: 'center' },
  Avatar: { backgroundColor: '#009688' },
  FaceIcon: { color: 'white' }
})

class GuestList extends Component {
  // set state
  state = {
    allGuest: [],
    newDialog: false,
    editDialog: false,
    editGuest: {},
    id: '',
    name: '',
    party: '',
    email: ''
  };
  // mount component
  componentDidMount () {
    this.loadGuest()
  }
// handle call all guest
  loadGuest = () => {
    API.getGuests()
      .then(res => this.setState({ allGuest: res.data }))
      .catch(err => console.log(err))
  };
// handle delete a guest with the given id
  deleteGuest = id => {
    API.deleteGuest(id)
      .then(res => this.loadGuest())
      .catch(err => console.log(err))
  };
}
export default GuestList
