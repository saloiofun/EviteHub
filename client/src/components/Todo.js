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
    // checked: [],
    open: false,
    todoItems: ['Get Plates', 'Reserver Location', 'Assign Tables', 'Check GuestList'],
    completedItems: ['Hire Party Planner', 'Check RSPV List', 'Hire Catering Co.'],
    value: 0,
    addTodo: ''
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  handleToggle = value => () => {
    const { todoItems, completedItems } = this.state

    const onCompleted = completedItems.indexOf(value)
    const onTodo = todoItems.indexOf(value)

    const newItems = [...completedItems]
    const currentItems = [...todoItems]

    if (onCompleted === -1) {
      newItems.push(value)
      currentItems.splice(onTodo, 1)
    } else if (onTodo === -1) {
      currentItems.push(value)
      newItems.splice(onCompleted, 1)
    }

    this.setState({
      todoItems: currentItems,
      completedItems: newItems
    })
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  handleSaveTodo = event => {
    event.preventDefault()
    const addTodo = this.state.addTodo

    this.state.todoItems.push(addTodo)
    this.handleRequestClose()
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
              {this.state.todoItems.map(value => (
                <ListItem
                  key={value}
                  dense
                  button
                  onClick={this.handleToggle(value)}
                  className={classes.listItem}
                  disableGutters
                  divider
                  style={{padding: 0}}
                >
                  <Checkbox
                    checked={this.state.completedItems.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={value} />
                </ListItem>
              ))}
            </List>
          </TabContainer>
        }
        { value === 1 &&
          <TabContainer dir=''>
            <List dense disablePadding>
              {this.state.completedItems.map(value => (
                <ListItem
                  key={value}
                  dense
                  button
                  onClick={this.handleToggle(value)}
                  className={classes.listItem}
                  disableGutters
                  divider
                  style={{padding: 0}}
                >
                  <Checkbox
                    checked={this.state.completedItems.indexOf(value) >= 0}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={value} />
                </ListItem>
              ))}
            </List>
          </TabContainer>
        }

        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
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
            <Button onClick={this.handleRequestClose} color='primary'>Cancel</Button>
            <Button onClick={this.handleSaveTodo} color='primary'>Save</Button>
          </DialogActions>
        </Dialog>

        <Button onClick={this.handleClickOpen} color='primary' raised>Add Todo</Button>
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
