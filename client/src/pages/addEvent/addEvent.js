import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import moment from 'moment'
import { DateTimePicker } from 'material-ui-pickers'
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft'
import Button from 'material-ui/Button'

const styles = theme => ({
  root: {
    flex: '1 1 100%',
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    },
    margin: '0 auto'
  },
  paper: {
    padding: '10px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dayWrapper: {
    position: 'relative'
  },
  day: {
    width: 36,
    height: 36,
    fontSize: 14,
    margin: '0 2px',
    color: theme.palette.text.primary
  },
  customDayHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '2px',
    right: '2px',
    border: '2px solid #6270bf',
    borderRadius: '50%'
  },
  nonCurrentMonthDay: {
    color: '#BCBCBC'
  },
  highlightNonCurrentMonthDay: {
    color: '#676767'
  },
  highlight: {
    background: '#9fa8da'
  },
  firstHighlight: {
    extend: 'highlight',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%'
  },
  endHighlight: {
    extend: 'highlight',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%'
  },
  dateCenter: {
    margin: '0 auto'
  }
})

class addEvent extends React.Component {
  state = {
    name: '',
    age: '',
    selectedDate: moment()
  };

  goBack = () => {
    this.props.history.push('/events')
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  renderCustomDayForDateTime = (date, selectedDate, dayInCurrentMonth, dayComponent) => {
    const { classes } = this.props

    const dayClassName = [
      (date.isSame(selectedDate, 'day')) && classes.customDayHighlight
    ].join(' ')

    return (
      <div className={classes.dayWrapper}>
        {dayComponent}
        <div className={dayClassName} />
      </div>
    )
  }

  render () {
    const { selectedDate } = this.state
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container direction='column' >
          <Grid item xs={12}>
            <Button onClick={this.goBack}>
              <KeyboardArrowLeftIcon />
            </Button>
          </Grid>
          <Paper className={classes.paper} elevation={4}>
            <form className={classes.container} noValidate autoComplete='off'>
              <Grid item xs={12} align='center'>
                <TextField
                  required
                  id='name'
                  label='Name'
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin='normal'
            />
              </Grid>
              <Grid item xs={12} align='center'>
                <TextField
                  required
                  id='location'
                  label='Location'
                  defaultValue=''
                  className={classes.textField}
                  margin='normal'
            />
              </Grid>
              <Grid item xs={12} align='center'>
                <div key='custom_day' className='picker'>
                  <DateTimePicker
                    id='dateTime'
                    label='Date and Time'
                    style={{width: '200px'}}
                    autoSubmit={false}
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    renderDay={this.renderCustomDayForDateTime}
              />
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='full-width'
                  label='Event Description'
                  InputLabelProps={{
                    shrink: true
                  }}
                  multiline
                  character='10'
                  placeholder='Event Description'
                  fullWidth
                  margin='normal'
            />
              </Grid>
            </form>
          </Paper>
        </Grid>
      </div>
    )
  }
}

addEvent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(addEvent)
