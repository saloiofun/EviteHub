import React, { Component } from 'react'
import API from '../../utils/Api'
import Switch from 'material-ui/Switch'
import IconButton from 'material-ui/IconButton'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
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
  // set initial state
  state = {
    allGuest: [],
    newDialog: false,
    editDialog: false,
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
  // open new guest modal
  newDialogOpen = () => {
    this.setState({ newDialog: true })
  };
  // close new guest modal
  newDialogClose = () => {
    this.setState({ newDialog: false })
  };
  // handle input changes
  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  };
  // Handle saves a guest to the database then close modal and call all guest
  saveGuest = () => {
    if (this.state.name && this.state.party && this.state.email) {
      API.saveGuest({ guestName: this.state.name, guestParty: this.state.party, guestEmail: this.state.email })
        .then(res => this.loadGuest(), this.newDialogClose())
        .catch(err => console.log(err))
    }
  };
  // handle RSVP toggle
  rsvpToggle = (id, rsvp) => (event, checked) => {
    API.updateGuest(id, {'rsvp': !rsvp})
    .then(res => this.loadGuest())
      .catch(err => console.log(err))
  };
  render () {
    const { classes } = this.props
    return (
      <div>

        <Chip
          avatar={
            <Avatar className={classes.Avatar}>
              <FaceIcon className={classes.FaceIcon} />
            </Avatar>
         }
          label=' Add a Guest ' style={{ backgroundColor: '#009688', color: 'white'}}
          onRequestDelete={this.newDialogOpen} deleteIcon={<AddIcon style={{ color: 'white'}} />}
       />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.TableCell}>NAME</TableCell>
              <TableCell className={classes.TableCell}>RSVP</TableCell>
              <TableCell className={classes.TableCell}>PARTY</TableCell>
              <TableCell className={classes.TableCell}>CONTACT</TableCell>
              <TableCell className={classes.TableCell}>EDIT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.allGuest.map(n => {
              return (
                <TableRow key={n._id}>
                  <TableCell className={classes.TableCell}>{n.guestName}</TableCell>
                  <TableCell className={classes.TableCell}><Switch checked={n.rsvp} onChange={this.rsvpToggle(n._id, n.rsvp)} />{n.rsvp ? 'Yes' : 'No'}</TableCell>
                  <TableCell className={classes.TableCell}>{n.guestParty}</TableCell>
                  <TableCell className={classes.TableCell}>{n.guestEmail}</TableCell>
                  <TableCell className={classes.TableCell}>
                    <Tooltip title='Delete' placement='right'>
                      <IconButton onClick={() => this.deleteGuest(n._id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <Dialog open={this.state.newDialog} onRequestClose={this.newDialogClose}>
          <DialogTitle>New Guest</DialogTitle>
          <DialogContent>
            <DialogContentText>
             You can add a new guest information here
           </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              name='name'
              className={classes.textField}
              label='Guest Name'
              onChange={this.handleInputChange}
           />
            <TextField
              margin='dense'
              name='party'
              className={classes.textField}
              label='No. of Party'
              onChange={this.handleInputChange}
           />
            <TextField
              margin='dense'
              name='email'
              label='Email Address'
              type='email'
              fullWidth
              onChange={this.handleInputChange}
           />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.newDialogClose} color='primary'>
             Cancel
           </Button>
            <Button onClick={this.saveGuest} color='primary'>
             Submit
           </Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

GuestList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GuestList)
