import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'

const styles = theme => ({
  root: {
    flex: '1 1 100%',
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    },
    margin: '0 auto'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  grids: {
    padding: '15px'
  }
})

class SendInvites extends React.Component {
  state = {
    subject: 'Event Name'
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  render () {
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <Grid container>
          <Grid item xs={11} className={classes.grids}>
            <TextField
              label='To'
              placeholder='To'
              className={classes.textField}
              fullWidth
              margin='normal'
          />
          </Grid>
          <Grid item xs={11} className={classes.grids}>
            <TextField
              id='subject'
              label='Subject'
              value={this.state.subject}
              className={classes.textField}
              margin='normal'
              fullWidth
              onChange={this.handleChange('subject')}
          />
          </Grid>
          <Grid item xs={11} className={classes.grids}>
            <TextField
              id='body'
              multiline
              rows='10'
              fullWidth
              defaultValue={`Hi you are invited to my event! 
Please click on the link to let me know if you can make it!`}
              className={classes.textField}
              margin='normal'
            />
          </Grid>
          <Grid item xs={2} align='center'>
            <Button raised color='primary' >
            Send
          </Button>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

SendInvites.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SendInvites)
