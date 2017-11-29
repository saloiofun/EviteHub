import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Archive from 'material-ui-icons/Loupe'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Input, { InputLabel } from 'material-ui/Input'
import {FormControl} from 'material-ui/Form'
import MenuItem from 'material-ui/Menu/MenuItem'

const styles = theme => ({
  root: {
    flex: '1 1 100%',
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    },
    margin: '0 auto'
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: '#009688'
  },
  title: { margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`, color: '#009688' },
  Avatar: { backgroundColor: '#009688' },
  icon: { color: 'white' }
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
      day: 'SUNDAY',
      date: '23',
      month: 'MARCH',
      time: '12 PM',
      address1:'1234 Santa Margarita Blvd',
      address2:'Lake Forest, CA 92555',
      background: 'url("/static/images/invitation/paper01.jpg")',
      titleFontSize: 40,
      titleFontType: "Arial"
    };
  
    // mount component
    componentDidMount () {
  
    }
  
    // handle specify input changes
    handleInputChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };
  
    // handle number input changes
    handleNumberInputChange = key => event => {
      this.setState({
        [key]: parseInt(event.target.value, 10),
      });
    };
  
    // handle savearea div
    handleSave = () => {
      const input = document.getElementById('saveArea');
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'JPEG', 28, 20);
          pdf.save("invitation.pdf");
        });
    }

    render () {
        const { classes } = this.props;
        return (
          <div className={classes.root}> 
            <Grid container spacing={24}>       
              <Grid item xs={12} sm={12} md={4}>
                <Typography type="title" className={classes.title}>
                      BACKGROUND
                </Typography>
                <Paper className={classes.paper}component="legend">
                  <TextField
                    select
                    label="Please select your background"
                    value={this.state.background}
                    onChange={this.handleInputChange('background')}
                    fullWidth
                    margin="normal"
                  >
                    {bg.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Paper>
                <Typography type="title" className={classes.title}>
                      INPUT
                </Typography>
                <Paper className={classes.paper}component="legend"> TITLE
                  <TextField
                    name="title"
                    label="Title"
                    helperText="ex: JOHAN & ERIKA"
                    fullWidth
                    margin="normal"
                    onChange={this.handleInputChange('title')}
                  />
                  <TextField
                    select
                    label="Font Type"
                    value={this.state.titleFontType}
                    onChange={this.handleInputChange('titleFontType')}
                    fullWidth
                    margin="normal"
                  >
                    {font.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                  <FormControl>
                  <InputLabel>Font Size</InputLabel>
                  <Input
                    type="number"
                    value={this.state.titleFontSize}
                    onChange={this.handleNumberInputChange('titleFontSize')}
                  />
                  </FormControl>
                </Paper>
                <Paper className={classes.paper} component="legend"> DETAIL
              <TextField
                label="Day"
                helperText="ex: SUNDAY"
                fullWidth
                margin="normal"
                onChange={this.handleInputChange('day')}
              />
              <TextField
                label="Date"
                helperText="ex: 13"
                fullWidth
                margin="normal"
                onChange={this.handleInputChange('date')}
              />
              <TextField
                label="Month"
                helperText="ex: MARCH"
                fullWidth
                margin="normal"
                onChange={this.handleInputChange('month')}
              />
              <Divider light />
              <TextField
                label="Time"
                helperText="ex: 12 PM or 08.30 PM"
                fullWidth
                margin="normal"
                onChange={this.handleInputChange('time')}
              />
              <Divider light />
              <TextField
                label="Address Line 1"
                helperText="ex: 1234 Santa Margarita Blvd"
                fullWidth
                margin="normal"
                onChange={this.handleInputChange('address1')}
              />
              <TextField
                label="Address Line 2"
                helperText="ex: Lake Forest, CA 92555"
                fullWidth
                margin="normal"
                onChange={this.handleInputChange('address2')}
              />
            </Paper>           
          </Grid>