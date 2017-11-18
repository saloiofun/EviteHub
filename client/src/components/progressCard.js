import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '0 1 auto'
  }
})

function MediaControlCard (props) {
  const { classes } = props

  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography type='display1'>{props.info}</Typography>
            <Typography type='headline' color='secondary'>
              {props.title}
            </Typography>
          </CardContent>
        </div>
        <CardContent>{props.children}</CardContent>
      </Card>
    </div>
  )
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(MediaControlCard)
