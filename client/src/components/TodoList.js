import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import Dialog, { DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import Tabs, { Tab } from 'material-ui/Tabs'
import {PlaylistAddCheck, PlaylistAdd, Delete} from 'material-ui-icons'
import ListIcon from 'material-ui-icons/List'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import API from '../utils/Api'
import Alert from './Alert'
import * as actionTypes from '../store/actions'

import compose from 'recompose/compose'
import { connect } from 'react-redux'

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
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

class TodoList extends React.Component {
  state = {
    checked: [],
    modal: false,
    todoItems: [],
    completedItems: [],
    value: 0,
    addTodo: '',
    snack: false,
    snackMessage: ''
  }

  componentDidMount () {
    if (this.props.currentEvent._id) {
      this.loadTodoItems()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentEvent._id !== this.props.currentEvent._id) {
      API.getTodoByEvent(nextProps.currentEvent._id)
      .then(res => {
        const todoDone = res.data.todo.filter(todoItem => !todoItem.todoDone)
        const todoNotDone = res.data.todo.filter(todoItem => todoItem.todoDone)

        this.setState({ todoItems: todoDone, completedItems: todoNotDone })
      })
      .catch(err => console.log(err))
    }
  }

  loadTodoItems = () => {
    // Get Completed Todo from DB
    API.getTodoByEvent(this.props.currentEvent._id)
    .then(res => {
      const todoDone = res.data.todo.filter(todoItem => !todoItem.todoDone)
      const todoNotDone = res.data.todo.filter(todoItem => todoItem.todoDone)

      this.setState({ todoItems: todoDone, completedItems: todoNotDone })
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
    this.closeSnack()
     // Updated Todo item todoDone as true
    API.updateTodo(id, {'todoDone': true})
      .then(res => {
        // Add to checked array
        const checked = this.state.checked
        checked.push(value)
        this.setState({checked})

        // load todo items from DB

        this.loadTodoItems()
        this.openSnack(`Checked: ${value}`)
        this.props.onFetchTodo(this.props.currentEvent._id)
      })
    .catch(err => console.log(err))
  }

  // Handles To Do Item Checkboxes
  handleNotCompleted = (id, value) => () => {
    this.closeSnack()
     // Updated Todo item todoDone as false
    API.updateTodo(id, {'todoDone': false})
      .then(res => {
        // Remove from checked array
        const checked = this.state.checked
        const valueIndex = checked.indexOf(value)
        checked.splice(valueIndex, 1)
        this.setState({checked})

        // load todo items from DB

        this.loadTodoItems()
        this.openSnack(`Unchecked: ${value}`)
        this.props.onFetchTodo(this.props.currentEvent._id)
      })
    .catch(err => console.log(err))
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
    const addTodo = this.state.addTodo

    // Save Todo in DB
    API.saveTodo({ eventId: this.props.currentEvent._id, todoDesc: addTodo })
    .then(res => {
      this.loadTodoItems()
      this.closeModal()
      this.openSnack(`Added: ${addTodo}`)
      this.props.onFetchTodo(this.props.currentEvent._id)
    })
    .catch(err => console.log(err))
  }

  // Opens Snackbar
  openSnack = (snackMessage) => {
    this.setState({ snack: true, snackMessage })
  }

  // Closes Snackbar
  closeSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ snack: false })
  }

  // Delete Todo item
  handleDeleteTodo = (id) => {
    API.deleteTodo(id)
    .then(res => {
      this.loadTodoItems()
      this.openSnack(`Deleted: ${res.data.todoDesc}`)
    })
    .catch(err => console.log(err))
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
            textColor='primary'
          >
            <Tab icon={<ListIcon />} label='To Do' />
            <Tab icon={<PlaylistAddCheck />} label='Completed' />
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
                    checked={this.state.checked.indexOf(todoItem.todoDesc) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={todoItem.todoDesc} />
                  <ListItemSecondaryAction>
                    <IconButton aria-label='Delete' onClick={() => this.handleDeleteTodo(todoItem._id)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
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
                    checked={this.state.checked.indexOf(todoItem.todoDesc) >= 0}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={todoItem.todoDesc} />
                  <ListItemSecondaryAction>
                    <IconButton aria-label='Delete' onClick={() => this.handleDeleteTodo(todoItem._id)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </TabContainer>
        }

        <Button onClick={this.openModal} color='primary' raised>Add Todo <PlaylistAdd className={classes.rightIcon} /></Button>

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

        <Alert
          open={this.state.snack}
          onRequestClose={this.closeSnack}
          message={this.state.snackMessage}
        />

      </div>
    )
  }
}

TodoList.propTypes = {
  classes: PropTypes.object.isRequired
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    currentEvent: state.event.currentEvent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchTodo: (eventId) => dispatch(actionTypes.fetchTodoDashboard(eventId))
  }
}

export default compose(
  withStyles(styles, {
    name: 'TodoList'
  }), connect(mapStateToProps, mapDispatchToProps)
)(TodoList)
