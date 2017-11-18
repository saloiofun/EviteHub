import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import moment from 'moment'
// import { DateTimePicker } from 'material-ui-pickers'
import { TimePicker, DatePicker } from 'material-ui-pickers'
import Button from 'material-ui/Button'
import API from '../utils/Api'

const styles = theme => ({
  paper: {
    padding: '10px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    width: 500
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
    location: '',
    description: '',
    selectedDate: moment()
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onSubmit = () => {
    var eventData = {
      eventName: this.state.name,
      description: this.state.description,
      location: this.state.location,
      date: this.state.selectedDate
    }
    this.setState({
      name: '',
      location: '',
      description: ''
    })
    console.log(eventData)
    API.saveEvent(eventData)
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
      <div>
        <Grid container direction='column' >
          <form className={classes.container} noValidate autoComplete='off'>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                required
                id='location'
                label='Location'
                value={this.state.location}
                onChange={this.handleChange('location')}
                className={classes.textField}
                margin='normal'
            />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label='Date'
                value={selectedDate}
                onChange={this.handleDateChange}
                animateYearScrolling={false}
                leftArrowIcon='<'
                rightArrowIcon='>'
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                label='Time'
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id='full-width'
                label='Event Description'
                InputLabelProps={{
                  shrink: true
                }}
                value={this.state.description}
                multiline
                character='10'
                onChange={this.handleChange('description')}
                placeholder='Event Description'
                fullWidth
                margin='normal'
                />
            </Grid>
            <Grid item xs={12} align='center'>
              <Button raised color='primary' onClick={this.onSubmit}>
                  Submit
                </Button>
            </Grid>
          </form>
        </Grid>
      </div>
    )
  }
}

addEvent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(addEvent)
