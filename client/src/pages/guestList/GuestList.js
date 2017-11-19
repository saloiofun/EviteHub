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

const GuestList = () => (
  <Button raised color='primary'>
    Guest List
  </Button>
)

export default GuestList
