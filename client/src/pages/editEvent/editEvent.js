import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import moment from 'moment'
// import { DateTimePicker } from 'material-ui-pickers'
import { TimePicker, DatePicker } from 'material-ui-pickers'
import Button from 'material-ui/Button'
import API from '../../utils/Api'
import classNames from 'classnames'
import orange from 'material-ui/colors/orange'
import Paper from 'material-ui/Paper'
import PagesIcon from 'material-ui-icons/Pages'

const styles = theme => ({
  root:{
    flex: '1 1 100%',
    [theme.breakpoints.up('sm')]: {
        width: '80%'
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
  },
  button: {
    margin: theme.spacing.unit
  },
  raisedAccent: {
    backgroundColor: orange[700]
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  spaceBottom: {
    marginBottom: theme.spacing.unit
  }
})

class addEvent extends React.Component {
  state = {
    // name: '',
    // location: '',
    // description: '',
    // selectedDate: moment(),
  };

  componentDidMount () {
    API.getEventId("5a12268354e951217c4e5d75")
    .then((res) => {
        var eventData = res.data
        console.log(eventData)
        this.setState({
            name: eventData.eventName,
            location: eventData.location,
            description: eventData.description,
            selectedDate: eventData.date
        })
    })
    .catch(function(err){
        if (err) throw err;
    })
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onSave = () => {
    var eventData = {
      eventName: this.state.name,
      description: this.state.description,
      location: this.state.location,
      date: this.state.selectedDate
    }
    console.log(eventData)
    // API.saveEvent(eventData)
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
        <div className = {classes.root}>
            <Paper className = {classes.paper}>
                <form noValidate autoComplete='off'>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                    <TextField
                        required
                        id='name'
                        label='Name'
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        fullWidth
                        margin='dense'
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        id='location'
                        label='Location'
                        value={this.state.location}
                        onChange={this.handleChange('location')}
                        fullWidth
                        margin='dense'
                    />
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <DatePicker
                        label='Date'
                        value={selectedDate}
                        onChange={this.handleDateChange}
                        animateYearScrolling={false}
                        leftArrowIcon='<'
                        rightArrowIcon='>'
                        fullWidth
                        margin='dense'
                    />
                    </Grid>
                    <Grid item xs={6} md={6}>
                    <TimePicker
                        label='Time'
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        fullWidth
                        margin='dense'
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
                        placeholder="What's the event about?"
                        fullWidth
                        margin='dense'
                    />
                    </Grid>
                </Grid>
                </form>
                <Button color='primary'>
                    Cancel
                </Button>
                <Button onClick={this.onSave} color='primary'>
                    Save
                </Button>
            </Paper>
        </div>

    )
  }
}

addEvent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(addEvent)
