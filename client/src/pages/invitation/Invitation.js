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
