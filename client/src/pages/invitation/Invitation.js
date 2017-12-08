import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import SaveIcon from 'material-ui-icons/Save'
import Button from 'material-ui/Button'
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
import Card01 from '../../components/invitationCard/Card01'
import Card02 from '../../components/invitationCard/Card02'
import Card03 from '../../components/invitationCard/Card03'

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
  },
  leftIcon: {
    marginRight: theme.spacing.unit
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
  },
  {
    value: 'url("/static/images/invitation/paper04.jpg")',
    label: 'paper04'
  },
  {
    value: 'url("/static/images/invitation/paper05.jpg")',
    label: 'paper05'
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
          pdf.addImage(imgData, 'JPEG', 13, 20)
          pdf.save('invitation.pdf')
        })
  }

    // handle background change
  Card = () => {
    switch (this.state.background) {
      case 'url("/static/images/invitation/paper02.jpg")':
        return (
          <Card02
            titleFontType={this.state.titleFontType}
            background={this.state.background}
            titleFontSize={this.state.titleFontSize}
            title={this.state.title}
            date={this.state.date}
            time={this.state.time}
            address1={this.state.address1}
            address2={this.state.address2}
      />)
      case 'url("/static/images/invitation/paper03.jpg")':
        return (
          <Card03
            titleFontType={this.state.titleFontType}
            background={this.state.background}
            titleFontSize={this.state.titleFontSize}
            title={this.state.title}
            date={this.state.date}
            time={this.state.time}
            address1={this.state.address1}
            address2={this.state.address2}
        />)
      default:
        return (
          <Card01
            titleFontType={this.state.titleFontType}
            background={this.state.background}
            titleFontSize={this.state.titleFontSize}
            title={this.state.title}
            date={this.state.date}
            time={this.state.time}
            address1={this.state.address1}
            address2={this.state.address2}
        />)
    }
  }

  render () {
    const { background, titleFontType, selectedDate, selectedTime } = this.state
    const { classes } = this.props

    return (
      <main className={classes.root}>
        <PageHeader title='Invitation Maker' body='Invitation Maker' />
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={4}>

            <ExpansionPanel defaultExpanded>
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
            {this.Card()}
            <hr />
            <center>
              <Button raised color='primary'
                onClick={this.handleSave}>
                <SaveIcon className={classes.leftIcon} />
                SAVE TO FILE
              </Button>
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
