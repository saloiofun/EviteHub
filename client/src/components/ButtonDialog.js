import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import orange from 'material-ui/colors/orange'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  raisedAccent: {
    backgroundColor: orange[700]
  }
})

class ButtonDialog extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true })
  };

  handleRequestClose = () => {
    this.setState({ open: false })
  };

  render () {
    const { classes } = this.props

    return (
      <span>
        <Button onClick={this.handleClickOpen} className={classNames(classes.button, classes.raisedAccent)} raised color='accent'>
          {this.props.children[0]}
          {this.props.text}
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>{this.props.title}</DialogTitle>
          <DialogContent>
            {this.props.children[1]}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleRequestClose} color='primary'>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    )
  }
}

ButtonDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonDialog)
