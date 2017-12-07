import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import Card01 from '../../components/invitationCard/Card01'

import API from '../../utils/Api'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    paddingTop: 80,
    margin: '0 auto',
    marginBottom: 30,
    minHeight: '100vh',
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    }
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 200
  }
})

class Rsvp extends React.Component {
  state = {
    titleFontType: '',
    background: 'url("/static/images/invitation/paper05.jpg")',
    titleFontSize: '',
    title: '',
    date: '',
    time: '',
    address1: '',
    address2: ''
  }

  componentDidMount () {
    var parsedURL = new URL(window.location.href)
    var hash = parsedURL.searchParams.get('token')
    API.getGuestByHash(hash)
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          throw (err)
        })
  }
  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <Card01
            titleFontType={this.state.titleFontType}
            background={this.state.background}
            titleFontSize={this.state.titleFontSize}
            title={this.state.title}
            date={this.state.date}
            time={this.state.time}
            address1={this.state.address1}
            address2={this.state.address2} />
          <CardContent>
            <Typography type='headline' component='h2'>
            Lizard
          </Typography>
            <Typography component='p'>
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
          </CardContent>
          <CardActions>
            <Button dense color='primary'>
            Share
          </Button>
            <Button dense color='primary'>
            Learn More
          </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

Rsvp.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Rsvp)
