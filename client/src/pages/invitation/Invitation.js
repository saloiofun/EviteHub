import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Archive from 'material-ui-icons/Loupe'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import html2canvas from 'html2canvas'
import JSPDF from 'jspdf'
import { TimePicker, DatePicker } from 'material-ui-pickers'
import moment from 'moment'
import MenuItem from 'material-ui/Menu/MenuItem'
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from 'material-ui/ExpansionPanel'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import PageHeader from '../../components/PageHeader'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    paddingTop: 80,
    margin: '0 auto',
    marginBottom: 30,
    minHeight: '100vh',
    [theme.breakpoints.up('md')]: {
      width: '80%',
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    }
  },
  title: { margin: theme.spacing.unit, color: '#009688' },
  Avatar: { backgroundColor: '#009688' },
  icon: { color: 'white' },
  displayBlock: {
    display: 'block'
  }
})

const bg = [
  {
    value: 'url("/static/images/invitation/paper01.jpg")',
    label: 'paper01'
  },
  {
    value: 'url("/static/images/invitation/paper02.jpg")',
    label: 'paper02'
  },
  {
    value: 'url("/static/images/invitation/paper03.jpg")',
    label: 'paper03'
  }
]

const font = [
    { value: 'Arial' },
    { value: 'Times New Roman' },
    { value: 'Trebuchet MS' }
]

class Invitation extends Component {
    // set initial state
  state = {
    title: 'JOHAN & ERIKA',
    date: moment().format('dddd, MMMM Do YYYY'),
    time: moment().format('hh:mm A'),
    address1: '1234 Santa Margarita Blvd',
    address2: 'Lake Forest, CA 92555',
    background: 'url("/static/images/invitation/paper01.jpg")',
    titleFontSize: 35,
    titleFontType: 'Arial',
    selectedDate: new Date(),
    selectedTime: new Date()

  };

    // mount component
  componentDidMount () {

  }

  handleDateChange = date => {
    this.setState({
      selectedDate: date,
      date: moment(date).format('dddd, MMMM Do YYYY')
    })
  }

  handleTimeChange = time => {
    this.setState({
      selectedTime: time,
      time: moment(time).format('hh:mm A')
    })
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    })
  };

    // handle specify input changes
  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

    // handle number input changes
  handleNumberInputChange = key => event => {
    this.setState({
      [key]: parseInt(event.target.value, 10)
    })
  };

    // handle savearea div
  handleSave = () => {
    const input = document.getElementById('saveArea')
    html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png')
          const pdf = new JSPDF()
          pdf.addImage(imgData, 'JPEG', 28, 20)
          pdf.save('invitation.pdf')
        })
  }

  render () {
    const { background, titleFontType, selectedDate, selectedTime, title, date, time, address1, address2 } = this.state
    const { classes } = this.props

    return (
      <main className={classes.root}>
        <PageHeader title='Invitation Maker' body='Invitation Maker' />
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={4}>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography type='title' className={classes.title}>BACKGROUND</Typography>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails classes={{root: classes.displayBlock}}>
                <TextField
                  select
                  label='Please select your background'
                  value={background}
                  onChange={this.handleInputChange('background')}
                  fullWidth
                  margin='dense'
                  >
                  {bg.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                    ))}
                </TextField>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography type='title' className={classes.title}>TITLE</Typography>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails classes={{root: classes.displayBlock}}>
                <Grid container spacing={24} alignItems='flex-end'>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      name='title'
                      label='Title'
                      helperText='ex: JOHAN &amp; ERIKA'
                      fullWidth
                      margin='dense'
                      onChange={this.handleInputChange('title')}
                      />
                  </Grid>

                  <Grid item xs={6} sm={6} md={6}>
                    <TextField
                      select
                      label='Font Type'
                      fullWidth
                      value={titleFontType}
                      onChange={this.handleInputChange('titleFontType')}
                      margin='dense'
                      >
                      {font.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                        ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={6} sm={6} md={6}>
                    <TextField
                      margin='dense'
                      type='number'
                      inputProps={{min: 12}}
                      label='Font Size'
                      fullWidth
                      value={this.state.titleFontSize}
                      onChange={this.handleNumberInputChange('titleFontSize')}
                      />
                  </Grid>
                </Grid>

              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography type='title' className={classes.title}>DETAILS</Typography>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails classes={{root: classes.displayBlock}}>
                <DatePicker
                  label='Date'
                  format='dddd, MMMM Do YYYY'
                  value={selectedDate}
                  onChange={this.handleDateChange}
                  animateYearScrolling={false}
                  leftArrowIcon='<'
                  rightArrowIcon='>'
                  fullWidth
                  margin='dense'
                />
                <Divider light />
                <TimePicker
                  label='Time'
                  value={selectedTime}
                  onChange={this.handleTimeChange}
                  fullWidth
                  margin='dense'
                />
                <Divider light />
                <TextField
                  label='Address Line 1'
                  helperText='ex: 1234 Santa Margarita Blvd'
                  fullWidth
                  margin='normal'
                  onChange={this.handleInputChange('address1')}
                  />
                <TextField
                  label='Address Line 2'
                  helperText='ex: Lake Forest, CA 92555'
                  fullWidth
                  margin='normal'
                  onChange={this.handleInputChange('address2')}
                  />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <div id='saveArea' style={{ textAlign: 'center',
              height: '425px',
              fontFamily: titleFontType,
              backgroundImage: background,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'}}>
              <p style={{ color: 'white', fontSize: this.state.titleFontSize, padding: '14% 0 0 0' }}> {title} </p>
              <p style={{ color: 'white', fontSize: '22px' }}> {date} </p>
              <p style={{ color: 'white', fontSize: '15px' }}> {time} </p>
              <p style={{ color: 'white', fontSize: '18px' }}> {address1} </p>
              <p style={{ color: 'white', fontSize: '18px' }}> {address2} </p>
            </div>
            <hr />
            <center>
              <Chip
                avatar={
                  <Avatar className={classes.Avatar}>
                    <Archive className={classes.icon} />
                  </Avatar>
                }
                label=' SAVE TO FILE ' style={{backgroundColor: '#009688', color: 'white'}}
                onClick={this.handleSave}
              />
            </center>
          </Grid>
        </Grid>
      </main>
    )
  }
}

Invitation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Invitation)
