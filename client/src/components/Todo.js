import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import Dialog, { DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import Tabs, { Tab } from 'material-ui/Tabs'
import PhoneIcon from 'material-ui-icons/Phone'
import FavoriteIcon from 'material-ui-icons/Favorite'
import AppBar from 'material-ui/AppBar'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import API from '../utils/Api'

function TabContainer ({ children, dir }) {
  return (
    <div dir={dir} style={{ paddingBottom: 8 * 3 }}>
      {children}
    </div>
  )
}

const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper
  }
})

class CheckboxList extends React.Component {
  state = {
    modal: false,
    todoItems: [],
    completedItems: [],
    value: 0,
    addTodo: '',
    snack: false
  }

  componentDidMount () {
    // Get Todo from DB
    API.getTodo()
    .then(res => {
      const todoItems = []
      const completedItems = []

      // Filter Todo items if done
      res.data.forEach(function (todoItem) {
        if (todoItem.todoDone === false) {
          todoItems.push(todoItem)
        } else {
          completedItems.push(todoItem)
        }
      })

      this.setState({ todoItems, completedItems })
    })
    .catch(err => console.log(err))
  }

  // Open Modal
  openModal = () => {
    this.setState({ modal: true })
  }

  // Close Modal
  closeModal = () => {
    this.setState({ modal: false })
  }

  // Handles To Do Item Checkboxes
  handleCompleted = (id, value) => () => {
    const { todoItems, completedItems } = this.state
    // const inCompletedItems = completedItems.indexOf(value)
    const inToDoItems = todoItems.indexOf(value)

    // if (inCompletedItems === -1) {
      // Updated Todo item todoDone as true
    API.updateTodo(id, {'todoDone': true})
      .then(res => {
        const newTodo = todoItems
        const newCompleted = completedItems

        newCompleted.push(res.data)
        // newTodo.splice(inToDoItems, 1)

        this.setState({ todoItems: newTodo, completedItems: newCompleted })
        this.openSnack()
      })
      .catch(err => console.log(err))
    // }
  }

  // Handles To Do Item Checkboxes
  handleNotCompleted = (id, value) => () => {
    const { todoItems, completedItems } = this.state
    const inCompletedItems = completedItems.indexOf(value)
    const inToDoItems = todoItems.indexOf(value)

    if (inToDoItems === -1) {
        // Updated Todo item todoDone as true
      API.updateTodo(id, {'todoDone': false})
        .then(res => {
          todoItems.push(res.data)
          completedItems.splice(inCompletedItems, 1)
          this.openSnack()
          this.setState({ todoItems, completedItems })
        })
        .catch(err => console.log(err))
    }
  }

  // Change Tabs
  handleChange = (event, value) => {
    this.setState({ value })
  }

   // Closes Snackbar
  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  // Opens Snackbar
  handleSaveTodo = event => {
    event.preventDefault()
    const addTodo = this.state.addTodo

    // Save Todo in DB
    API.saveTodo({ todoDesc: addTodo })
    .then(res => {
      this.state.todoItems.push(res.data)
      this.closeModal()
    })
    .catch(err => console.log(err))
  }

  // Opens Snackbar
  openSnack = () => {
    this.setState({ snack: true })
  }

  // Closes Snackbar
  closeSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ snack: false })
  }

  render () {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.root}>
        <AppBar position='static' color='default' style={{boxShadow: 'none'}}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            fullWidth
            indicatorColor='primary'
            textColor='accent'
          >
            <Tab icon={<PhoneIcon color='primary' />} label='To Do' />
            <Tab icon={<FavoriteIcon color='primary' />} label='Completed' />
          </Tabs>
        </AppBar>

        { value === 0 &&
          <TabContainer dir=''>
            <List dense disablePadding>
              {this.state.todoItems.map(todoItem => (
                <ListItem
                  key={todoItem._id}
                  id={todoItem._id}
                  dense
                  button
                  onClick={this.handleCompleted(todoItem._id, todoItem.todoDesc)}
                  className={classes.listItem}
                  disableGutters
                  divider
                  style={{padding: 0}}
                >
                  <Checkbox
                    checked={this.state.completedItems.indexOf(todoItem.todoDesc) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={todoItem.todoDesc} />
                </ListItem>
              ))}
            </List>
          </TabContainer>
        }
        { value === 1 &&
          <TabContainer dir=''>
            <List dense disablePadding>
              {this.state.completedItems.map(todoItem => (
                <ListItem
                  key={todoItem._id}
                  id={todoItem._id}
                  dense
                  button
                  onClick={this.handleNotCompleted(todoItem._id, todoItem.todoDesc)}
                  className={classes.listItem}
                  disableGutters
                  divider
                  style={{padding: 0}}
                >
                  <Checkbox
                    checked={this.state.todoItems.indexOf(todoItem.todoDesc) >= 0}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={todoItem.todoDesc} />
                </ListItem>
              ))}
            </List>
          </TabContainer>
        }

        <Button onClick={this.openModal} color='primary' raised>Add Todo</Button>

        <Dialog open={this.state.modal} onRequestClose={this.closeModal}>
          <DialogTitle>Add To Do</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='addTodo'
              name='addTodo'
              label='To Do Item'
              type='text'
              fullWidth
              onChange={this.handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeModal} color='primary'>Cancel</Button>
            <Button onClick={this.handleSaveTodo} color='primary'>Save</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.snack}
          autoHideDuration={3000}
          onRequestClose={this.closeSnack}
          SnackbarContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>Saved</span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              className={classes.close}
              onClick={this.closeSnack}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />

      </div>
    )
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
}

export default withStyles(styles)(CheckboxList)
