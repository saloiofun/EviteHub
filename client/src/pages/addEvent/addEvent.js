import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import moment from 'moment'
import { Typography } from 'material-ui'
import { DateTimePicker } from 'material-ui-pickers'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },dayWrapper: {
    position: 'relative',
  },
  day: {
    width: 36,
    height: 36,
    fontSize: 14,
    margin: '0 2px',
    color: theme.palette.text.primary,
  },
  customDayHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '2px',
    right: '2px',
    border: '2px solid #6270bf',
    borderRadius: '50%',
  },
  nonCurrentMonthDay: {
    color: '#BCBCBC',
  },
  highlightNonCurrentMonthDay: {
    color: '#676767',
  },
  highlight: {
    background: '#9fa8da',
  },
  firstHighlight: {
    extend: 'highlight',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  endHighlight: {
    extend: 'highlight',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }
})

class addEvent extends React.Component {

  state = {
    name: '',
    age: '',
    multiline: 'Controlled',
    selectedDate: moment()
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  renderCustomDayForDateTime = (date, selectedDate, dayInCurrentMonth, dayComponent) => {
    const { classes } = this.props;

    const dayClassName = [
      (date.isSame(selectedDate, 'day')) && classes.customDayHighlight,
    ].join(' ');

    return (
      <div className={classes.dayWrapper}>
        {dayComponent}
        <div className={dayClassName} />
      </div>
    );
  }

  render() {
    const { selectedDate } = this.state;
    const { classes } = this.props
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
        <Grid container >
          <form className={classes.container} noValidate autoComplete='off'>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="location"
              label="Location"
              defaultValue=""
              className={classes.textField}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <div key="custom_day" className="picker">
              <Typography type="headline" align="center" gutterBottom>
                Event Date/Time
              </Typography>
      
              <DateTimePicker
                id = "dateTime"
                label = "Date and Time"
                autoSubmit={false}
                value={selectedDate}
                onChange={this.handleDateChange}
                renderDay={this.renderCustomDayForDateTime}
              />
            </div>
            </Grid>
            <Grid item xs={12}>
            <TextField
              id="full-width"
              label="Event Description"
              InputLabelProps={{
                shrink: true,
              }}
              multiline
              placeholder="Event Description"
              fullWidth
              margin="normal"
            />
            </Grid>
          </form>
          </Grid>
        </Paper>
      </div>
    )
  }
}

addEvent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(addEvent)
